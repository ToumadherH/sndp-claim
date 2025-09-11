const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Reclamation = require("../models/reclamation"); //communiquer avec la base de données
const { Gerant } = require("../models/discriminators");
const Alert=require("../models/alert");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

const createReclamation = async (req, res) => {
  try {
    const { type } = req.body;
    const gerantId = req.user._id;

    const gerant = await Gerant.findById(gerantId);
    if (!gerant) {
      return res.status(404).json({ error: "Gerant not found" });
    }

    // Count same type in the last 30 days (BEFORE creating the new reclamation)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const count = await Reclamation.countDocuments({
      gerantId,
      type,
      createDate: { $gte: thirtyDaysAgo },
    });

    // Create the reclamation
    const reclamation = await Reclamation.create({
      type,
      gerantId,
    });

    // If 3 or more (before adding new one), generate alert for assistant
    if (count >= 3 && gerant.assistantId) {
      await Alert.create({
        assistantId: gerant.assistantId,
        gerantId,
        type,
        count: count + 1, // Include the new reclamation
      });
      
      console.log(`Alert created for assistant: ${gerant.assistantId}`);
    }

    // Return only the reclamation in response
    res.status(201).json({
      success: true,
      reclamation,
      message: "Reclamation created successfully"
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating reclamation" });
  }
};

const getAllReclamations = async (req, res) => {
  try {
    const reclamations = await Reclamation.find()
      .populate("gerantId")
      .populate("intervenantId");
    res.status(200).json(reclamations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createReclamation, getAllReclamations };
