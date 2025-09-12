const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const {
  getAlertsForAssistant,
  markAlertAsRead,
  getAssistantProfile,
} = require("../controllers/assistantController");

router.get("/alerts", authMiddleware, getAlertsForAssistant);
router.put("/alerts/read", authMiddleware, markAlertAsRead);
router.get("/profile",authMiddleware,getAssistantProfile);

module.exports = router;
