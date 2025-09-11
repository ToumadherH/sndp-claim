const express = require("express");
const router = express.Router();
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

module.exports = router;
