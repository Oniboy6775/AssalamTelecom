const express = require("express");
const { dataReloadedWebhook } = require("../Controllers/webhooks");
const router = express.Router();
router.post("/dataReloaded", dataReloadedWebhook);

module.exports = router;
