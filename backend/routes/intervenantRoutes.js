const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const {
  getReclamationsForIntervenant,
  updateReclamationStatus,
  getAllIntervenants,
  getIntervenantProfile,
} = require("../controllers/intervenantController");

router.get("/my-reclamations", authMiddleware, getReclamationsForIntervenant);
router.put("/update-status", authMiddleware, updateReclamationStatus);
router.get("/intervenants", authMiddleware, getAllIntervenants);
router.get("/profile", authMiddleware, getIntervenantProfile);

module.exports = router;
