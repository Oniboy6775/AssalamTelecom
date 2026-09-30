// Rebuilds user balances from the most recent transaction's balance_After.
// Dry run by default:   node recoverBalances.js
// Apply for real:       node recoverBalances.js --apply
// NOTE: transactions auto-delete after 30 days, so only users with a
// transaction in the last 30 days can be recovered this way.
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./Models/usersModel");
const Transactions = require("./Models/transactionModel");

const APPLY = process.argv.includes("--apply");

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const latest = await Transactions.aggregate([
    { $sort: { createdAt: -1 } },
    { $group: { _id: "$trans_By", balance: { $first: "$balance_After" }, at: { $first: "$createdAt" }, type: { $first: "$trans_Type" } } },
  ]);
  console.log("users with transactions:", latest.length);
  let changed = 0, skipped = 0;
  for (const row of latest) {
    let user;
    try { user = await User.findById(row._id); } catch { user = null; }
    if (!user) { skipped++; continue; }
    if ((user.balance || 0) !== 0) { skipped++; continue; } // never overwrite a non-zero balance
    console.log(`${user.userName || user.email}: 0 -> ${row.balance}  (last: ${row.type}, ${row.at.toISOString()})`);
    if (APPLY) await User.updateOne({ _id: user._id }, { $set: { balance: row.balance } });
    changed++;
  }
  console.log(`${APPLY ? "UPDATED" : "WOULD UPDATE"}: ${changed}, skipped: ${skipped}`);
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
