const express = require("express");
const router = express.Router();
const {
  createReclamation,
  getAllReclamations,
} = require("../controllers/reclamationController");
const {getReclamationsForAssistant,assignReclamationToIntervenant}=require("../controllers/assistantController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware,createReclamation);
router.get("/",authMiddleware,getAllReclamations);
router.get("/assistant/:assistantId",getReclamationsForAssistant);
router.put("/assign",assignReclamationToIntervenant);

module.exports = router;
