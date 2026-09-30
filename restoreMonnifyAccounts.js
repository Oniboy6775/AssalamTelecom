// Re-fetches existing Monnify reserved accounts for users whose accountNumbers were wiped.
// Dry run:  node restoreMonnifyAccounts.js      Apply:  node restoreMonnifyAccounts.js --apply
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
const User = require("./Models/usersModel");
const APPLY = process.argv.includes("--apply");
const { MONNIFY_API_URL, MONNIFY_API_KEY, MONNIFY_API_SECRET } = process.env;

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const candidates = [
    MONNIFY_API_KEY && MONNIFY_API_SECRET && Buffer.from(MONNIFY_API_KEY + ":" + MONNIFY_API_SECRET).toString("base64"),
    process.env.MONNIFY_API_ENCODED,
  ].filter(Boolean);
  let token = null;
  for (const enc of candidates) {
    try {
      const login = await axios.post(`${MONNIFY_API_URL}/api/v1/auth/login`, {}, { headers: { Authorization: `Basic ${enc}` } });
      token = login.data.responseBody.accessToken;
      break;
    } catch (e) {
      console.log("Monnify login failed:", e.response?.status, e.response?.data?.responseMessage || e.message);
    }
  }
  if (!token) {
    console.log("URL used:", MONNIFY_API_URL);
    console.log("Could not log in to Monnify. Check MONNIFY_API_URL matches your keys (sandbox.monnify.com vs api.monnify.com) and the keys are current.");
    process.exit(1);
  }
  const users = await User.find({ $or: [{ accountNumbers: { $size: 0 } }, { accountNumbers: { $exists: false } }] });
  console.log("users with no accountNumbers:", users.length);
  let ok = 0, notFound = 0;
  const stats = {};
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1);
  for (const u of users) {
    let accounts = null;
    // references used by the app were the email or the userName exactly as typed at signup,
    // so also try common capitalisations (the DB stores them lowercased)
    const refs = [...new Set([u.email, u.userName, cap(u.userName), u.userName.toUpperCase(), cap(u.email)])];
    for (const ref of refs) {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const r = await axios.get(`${MONNIFY_API_URL}/api/v2/bank-transfer/reserved-accounts/${encodeURIComponent(ref)}`, { headers: { Authorization: `Bearer ${token}` } });
          accounts = r.data.responseBody.accounts;
          break;
        } catch (e) {
          const st = e.response?.status || e.code || "err";
          if (st === 429) { await sleep(2000); continue; } // rate limited, retry
          stats[st] = (stats[st] || 0) + 1;
          break;
        }
      }
      await sleep(150);
      if (accounts && accounts.length) break;
    }
    if (!accounts || !accounts.length) { notFound++; continue; }
    console.log(u.userName, "->", accounts.map((a) => `${a.bankName} ${a.accountNumber}`).join(", "));
    if (APPLY) await User.updateOne({ _id: u._id }, { $set: { accountNumbers: accounts.map((a) => ({ bankName: a.bankName, accountNumber: a.accountNumber })) } });
    ok++;
  }
  console.log("failed lookups by HTTP status:", stats);
  console.log(`${APPLY ? "UPDATED" : "WOULD UPDATE"}: ${ok}, no Monnify account found: ${notFound}`);
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
