const Reclamation = require("../models/reclamation"); //communiquer avec la base de données

const createReclamation = async (req, res) => {
  try {
    const reclamation = await Reclamation.create(req.body);
    res.status(201).json(reclamation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getAllReclamations = async (req, res) => {
  try {
    const reclamations = await Reclamation.find()
      .populate("gerantId")
      .populate("technicienId");
    res.status(200).json(reclamations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createReclamation, getAllReclamations };
