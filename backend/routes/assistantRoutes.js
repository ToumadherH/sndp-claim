const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const {
  getAlertsForAssistant,
  markAlertAsRead,
} = require("../controllers/assistantController");

router.get("/alerts", authMiddleware, getAlertsForAssistant);
router.put("/alerts/read", authMiddleware, markAlertAsRead);

module.exports = router;
