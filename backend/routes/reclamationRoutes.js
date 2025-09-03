const express = require("express");
const router = express.Router();
const {
  createReclamation,
  getAllReclamations,
} = require("../controllers/reclamationController");
const {getReclamationsForAssistant}=require("../controllers/assistantController");


router.post("/", createReclamation);
router.get("/", getAllReclamations);
router.get("/assistant/:assistantID",getReclamationsForAssistant);

module.exports = router;
