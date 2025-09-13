const express = require("express");
const router = express.Router();
const {authMiddleware, requireRole} = require("../middleware/authMiddleware");
const { changeAssistantForGerant, changeStationForGerant } = require("../controllers/adminController");

// Only Admin can do this (authMiddleware should check role === "Admin")
router.put("/change-assistant", authMiddleware, requireRole("Admin"), changeAssistantForGerant);
router.put("/change-station", authMiddleware, requireRole("Admin"), changeStationForGerant);

module.exports = router;
