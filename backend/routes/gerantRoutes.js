const express = require("express");
const router = express.Router();
const {getGerantProfile} = require("../controllers/gerantController");
const {authMiddleware} = require("../middleware/authMiddleware");
const {
  getMyReclamations,
  confirmResolution,
  rejectResolution
} = require("../controllers/gerantController");

// Get history
router.get("/my-reclamations", authMiddleware, getMyReclamations);

// Confirm resolution
router.put("/confirm", authMiddleware, confirmResolution);

// Reject resolution
router.put("/reject", authMiddleware, rejectResolution);

router.get("/profile",authMiddleware,getGerantProfile);

module.exports = router;
