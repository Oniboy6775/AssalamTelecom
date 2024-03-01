const Transaction = require("../Models/transactionModel");
const Users = require("../Models/usersModel");

const searchTransaction = async (req, res) => {
  const { type, phoneNumber, sort, userName, from, to, status } = req.query;
  const { AGENT_1, AGENT_2, AGENT_3, ADMIN_ID } = process.env;
  const agents = [AGENT_1, AGENT_2, AGENT_3];
  const isAgent = agents.find((e) => e === req.user.userId) === req.user.userId;
  let isAdmin = ADMIN_ID === req.user.userId;

  let queryObject = {};
  if (!isAdmin && !isAgent) {
    queryObject = { trans_By: req.user.userId };
  }
  // type of transaction
  if (type && type !== "all") {
    queryObject.trans_Type = type;
  }
  // filter with phone number
  if (phoneNumber) {
    queryObject.phone_number = { $regex: phoneNumber, $options: "i" };
  }
  let userId;
  // filter with username
  if (userName) {
    let user = await Users.findOne({
      userName: { $regex: userName, $options: "i" },
    });
    if (user) {
      userId = user._id;
    }
  }
  // filter with transaction status
  if (status && status !== "all") {
    queryObject.trans_Status = status;
  }
  //  filter with userId
  if (userName && userId) {
    queryObject.trans_By = userId;
  }
  if (from) {
    queryObject.createdAt = { $gte: from, $lt: to || new Date() };
  }

  let result = Transaction.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("-createdAt");
  }

  // Fetch transactions for the selected day to calculate no of GB sold

  let start = from ? from : new Date().setHours(0, 0, 0, 0);
  let end = to ? to : new Date().setHours(23, 59, 59, 999);
  let query = {
    createdAt: { $gte: start, $lt: end },
  };
  if (!isAdmin && !isAgent) {
    query.trans_By = req.user.userId;
  }
  if (userName) {
    query.trans_By = userId;
  }
  // Calculating total GB purchased
  const today = await Transaction.find(query);
  const totalSales = today.reduce((acc, cur) => {
    acc += cur.trans_volume_ratio;
    return acc;
  }, 0);
  // Calculating profit for selected transactions
  const totalProfit = today.reduce((acc, cur) => {
    const currentProfit = isNaN(cur.trans_profit) ? 0 : cur.trans_profit;
    acc += currentProfit;
    return acc;
  }, 0);
  const calculateStat = (network, type) => {
    let result = {
      network: `${network} ${type}`,
      profit: 0,
      total_volume_sold: 0,
    };
    let filtered = today.filter(
      (e) =>
        e.trans_Type &&
        e.trans_Network.split(" ")[0] === network &&
        e.trans_Network.split(" ")[1] === type
    );
    // profit
    result.profit = filtered.reduce((acc, cur) => {
      const currentProfit = isNaN(cur.trans_profit) ? 0 : cur.trans_profit;
      acc += currentProfit;
      return acc;
    }, 0);
    // total sales
    result.total_volume_sold = filtered.reduce((acc, cur) => {
      acc += cur.trans_volume_ratio;
      return acc;
    }, 0);
    return result;
  };
  let mtnSMESales = calculateStat("MTN", "SME");
  let mtnCGSales = calculateStat("MTN", "CG");
  let mtnCOUPONSales = calculateStat("MTN", "COUPON");
  let gloSMESales = calculateStat("GLO", "SME");
  let gloCGSales = calculateStat("GLO", "CG");
  let AirtelSMESales = calculateStat("AIRTEL", "SME");
  let AirtelCGSales = calculateStat("AIRTEL", "CG");
  let NmobileCGSales = calculateStat("9MOBILE", "CG");
  let NmobileSMESales = calculateStat("9MOBILE", "SME");
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  result = await result.skip(skip).limit(limit);
  let noOfTransaction = await Transaction.countDocuments(queryObject);
  const totalPages = Math.ceil(noOfTransaction / limit);
  res.status(200).json({
    stat:
      isAdmin || isAgent
        ? [
            mtnSMESales,
            mtnCGSales,
            mtnCOUPONSales,
            gloSMESales,
            gloCGSales,
            AirtelCGSales,
            AirtelSMESales,
            NmobileCGSales,
            NmobileSMESales,
          ]
        : [],
    transactions: result,
    totalPages,
    totalSales,
    totalProfit,
  });
};
module.exports = searchTransaction;
