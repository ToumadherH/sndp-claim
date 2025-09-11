const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { changeAssistantForGerant, changeStationForGerant } = require("../controllers/adminController");

// Only Admin can do this (authMiddleware should check role === "Admin")
router.put("/gerant/change-assistant", authMiddleware, changeAssistantForGerant);
router.put("/gerant/change-station", authMiddleware, changeStationForGerant);

module.exports = router;
