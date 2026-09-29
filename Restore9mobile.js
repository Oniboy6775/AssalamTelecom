// Run once:  node restore9mobile.js
// Re-inserts the default 9MOBILE plans and fixes any wrongly-saved 9MOBILE plans.
const mongoose = require("mongoose");
require("dotenv").config();
const Data = require("./Models/dataModel");
const { NMOBILE } = require("./API_DATA/newData");

const ratio = (plan) => {
  const m = String(plan).match(/([\d.]+)\s*(GB|MB)/i);
  if (!m) return 0;
  return m[2].toUpperCase() === "GB" ? Number(m[1]) : Number(m[1]) / 1000;
};

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  // fix plans saved under wrong id / name variants
  const fix = await Data.updateMany(
    { plan_network: { $regex: /^(9\s*mobile|nmobile|etisalat)$/i } },
    { $set: { plan_network: "9MOBILE", network: 6 } }
  );
  console.log("fixed existing:", fix.modifiedCount);
  const existing = await Data.countDocuments({ plan_network: "9MOBILE" });
  console.log("9MOBILE plans now in DB:", existing);
  if (existing === 0) {
    await Data.create(
      NMOBILE.map((p) => ({ ...p, volumeRatio: ratio(p.plan), isAvailable: true }))
    );
    console.log("inserted defaults:", NMOBILE.length);
  }
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });