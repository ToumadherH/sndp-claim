const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Reclamation = require("../models/reclamation"); //communiquer avec la base de données
const { Gerant } = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

const createReclamation = async (req, res) => {
  try {
    const { type } = req.body;
    const gerantId = req.user._id; // assuming JWT middleware sets req.user

    const gerant = await Gerant.findById(gerantId);

    const reclamation = await Reclamation.create({
      type,
      gerantId: gerantId,
    });

    res.status(201).json(reclamation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating reclamation" });
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
