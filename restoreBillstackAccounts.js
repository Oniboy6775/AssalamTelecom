// Re-imports PalmPay / 9PSB accounts from BillStack's own list into users.accountNumbers.
// Dry run:  node restoreBillstackAccounts.js      Apply:  node restoreBillstackAccounts.js --apply
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
const User = require("./Models/usersModel");
const APPLY = process.argv.includes("--apply");
const { BILLSTACK_API, BILLSTACK_SECRET } = process.env;

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const base = BILLSTACK_API.replace(/\/+$/, "");
  const all = [];
  for (let page = 1; ; page++) {
    let r;
    try {
      r = await axios.post(`${base}/listVirtualAccounts/`, { page, pageSize: 100 }, { headers: { Authorization: `Bearer ${BILLSTACK_SECRET}` } });
    } catch (e) {
      console.log("BillStack list failed:", e.response?.status, e.response?.data?.message || e.message, "| url:", `${base}/listVirtualAccounts/`);
      process.exit(1);
    }
    const body = r.data;
    all.push(...(body.data || []));
    console.log(`fetched page ${page}/${body.meta?.totalPages} (${all.length} accounts)`);
    if (!body.meta || page >= body.meta.totalPages) break;
  }
  let added = 0, already = 0, noUser = 0, skipped = 0;
  for (const acc of all) {
    const ref = acc.merchant_reference || "";
    const i = ref.indexOf("_");
    if (i < 0) { skipped++; continue; }
    const bankName = ref.slice(0, i).toLowerCase();            // palmpay / 9psb
    const email = ref.slice(i + 1).toLowerCase();
    const detail = (acc.account || [])[0];
    if (!detail) { skipped++; continue; }
    const user = await User.findOne({ email });
    if (!user) { noUser++; continue; }
    if ((user.accountNumbers || []).some((a) => a.bankName === bankName)) { already++; continue; }
    console.log(`${user.userName}: + ${bankName} ${detail.account_number}`);
    if (APPLY) await User.updateOne({ _id: user._id }, { $push: { accountNumbers: { bankName, accountNumber: detail.account_number } } });
    added++;
  }
  console.log(`${APPLY ? "ADDED" : "WOULD ADD"}: ${added}, already present: ${already}, no matching user: ${noUser}, skipped (odd reference): ${skipped}, total at BillStack: ${all.length}`);
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
