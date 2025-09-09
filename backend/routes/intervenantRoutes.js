const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getReclamationsForIntervenant,
  updateReclamationStatus,
} = require("../controllers/intervenantController");

router.get("/my-reclamations", authMiddleware, getReclamationsForIntervenant);
router.put("/update-status", authMiddleware, updateReclamationStatus);

module.exports = router;
