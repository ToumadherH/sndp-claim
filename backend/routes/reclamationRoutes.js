const express = require("express");
const router = express.Router();
const {
  createReclamation,
  getAllReclamations,
} = require("../controllers/reclamationController");

router.post("/", createReclamation);
router.get("/", getAllReclamations);

module.exports = router;
