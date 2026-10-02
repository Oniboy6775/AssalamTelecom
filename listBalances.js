// Shows the biggest balances and any negative balances. Run: node listBalances.js
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./Models/usersModel");
const Transactions = require("./Models/transactionModel");
(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const top = await User.find().sort({ balance: -1 }).limit(5).select("userName userType balance");
  console.log("TOP 5 BALANCES:");
  top.forEach((u) => console.log(" ", u.userName, `[${u.userType}]`, u.balance));
  const neg = await User.find({ balance: { $lt: 0 } }).select("userName balance");
  console.log("NEGATIVE BALANCES:", neg.length);
  neg.forEach((u) => console.log(" ", u.userName, u.balance));
  if (top[0]) {
    const tx = await Transactions.find({ trans_By: String(top[0]._id) }).sort({ createdAt: -1 }).limit(8).lean();
    console.log(`\nLAST TRANSACTIONS of ${top[0].userName}:`);
    tx.forEach((t) => console.log(" ", t.createdAt.toISOString(), t.trans_Type, t.trans_Network, "amount", t.trans_amount, "before", t.balance_Before, "after", t.balance_After));
  }
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
