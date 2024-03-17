require("dotenv").config();
const isAdmin = async (req, res, next) => {
  const {
    AGENT_1,
    AGENT_2,
    AGENT_3,
    AGENT_4,
    AGENT_5,
    AGENT_6,
    AGENT_7,
    AGENT_8,
    AGENT_9,
    AGENT_10,
    ADMIN_1,
    ADMIN_2,
    ADMIN_3,
  } = process.env;
  const admins = [ADMIN_1, ADMIN_2, ADMIN_3];
  let isAdmin = admins.find((e) => e === req.user.userId) === req.user.userId;
  const agents = [AGENT_1, AGENT_2, AGENT_3];
  const isAgent = agents.find((e) => e === req.user.userId) === req.user.userId;
  // let isAdmin = ADMIN_ID === req.user.userId;
  if (!isAdmin && !isAgent) {
    return res
      .status(400)
      .json({ msg: "You are not allowed to perform this action" });
  }
  next();
};
module.exports = isAdmin;
