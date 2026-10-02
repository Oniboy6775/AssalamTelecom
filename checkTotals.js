// Prints the admin totals straight from the database (no app, no frontend).
// Run: node checkTotals.js
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./Models/usersModel");
const Transactions = require("./Models/transactionModel");
(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const users = await User.countDocuments();
  const noBalance = await User.countDocuments({ $or: [{ balance: null }, { balance: { $exists: false } }, { balance: { $type: "string" } }] });
  const agg = await User.aggregate([{ $group: { _id: null, total: { $sum: "$balance" } } }]);
  console.log("users:", users, "| users with missing/text balance:", noBalance);
  console.log("TOTAL USER BALANCE:", agg.length ? agg[0].total : 0);
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const t = await Transactions.find({ createdAt: { $gte: start } }).lean();
  const num = (x) => Number(x) || 0;
  console.log("transactions today:", t.length);
  console.log("TOTAL DATA SOLD today (GB):", t.reduce((a, c) => a + num(c.trans_volume_ratio), 0));
  console.log("PROFIT today:", t.reduce((a, c) => a + num(c.trans_profit), 0));
  for (const days of [1, 7, 30]) {
    const from = new Date(Date.now() - days * 864e5);
    const r = await Transactions.find({ createdAt: { $gte: from } }).lean();
    const gb = r.reduce((a, c) => a + num(c.trans_volume_ratio), 0);
    console.log(`DATA SOLD last ${days} day(s): ${gb.toFixed(2)} GB (${(gb / 1000).toFixed(2)} TB) in ${r.length} transactions`);
  }
  const bad = t.filter((c) => c.trans_volume_ratio === undefined || c.trans_volume_ratio === null || c.trans_profit === undefined).length;
  console.log("today's transactions missing volume/profit fields:", bad);
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
