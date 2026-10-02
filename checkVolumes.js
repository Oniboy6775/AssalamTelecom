// Finds data plans whose volumeRatio doesn't match their name (e.g. "1GB" with ratio 1000),
// which inflates "Total sales" (GB sold). Run: node checkVolumes.js        Fix: node checkVolumes.js --fix
const mongoose = require("mongoose");
require("dotenv").config();
const Data = require("./Models/dataModel");
const Transactions = require("./Models/transactionModel");
const FIX = process.argv.includes("--fix");
const gbFromName = (n) => {
  const m = String(n).match(/([\d.]+)\s*(TB|GB|MB)/i);
  if (!m) return null;
  const v = Number(m[1]), u = m[2].toUpperCase();
  return u === "TB" ? v * 1000 : u === "GB" ? v : v / 1000;
};
(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const plans = await Data.find();
  let bad = 0;
  for (const p of plans) {
    const expect = gbFromName(p.plan);
    if (expect === null) continue;
    if (Math.abs((p.volumeRatio || 0) - expect) > 0.001) {
      bad++;
      console.log(`${p.plan_network} ${p.plan_type} "${p.plan}": volumeRatio ${p.volumeRatio}, expected ${expect}`);
      if (FIX) await Data.updateOne({ _id: p._id }, { $set: { volumeRatio: expect } });
    }
  }
  console.log(`${FIX ? "FIXED" : "MISMATCHED PLANS"}: ${bad} of ${plans.length}`);
  const big = await Transactions.find({ trans_volume_ratio: { $gt: 100 } }).sort({ trans_volume_ratio: -1 }).limit(10).lean();
  console.log("\nTRANSACTIONS WITH VOLUME > 100 GB (biggest 10):");
  big.forEach((t) => console.log(` ${t.createdAt.toISOString()} ${t.trans_Network} amount ${t.trans_amount} volume ${t.trans_volume_ratio}`));
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
