// controllers/assistantController.js
const Reclamation = require("../models/reclamation");
const { Gerant, Intervenant } = require("../models/discriminators");
const Alert = require("../models/alert");
const {Assistant} = require("../models/discriminators");

// Get all reclamations submitted by gerants of this assistant
exports.getReclamationsForAssistant = async (req, res) => {
  try {
    const { assistantId } = req.params;

    const gerants = await Gerant.find({ assistantId });
    const gerantIds = gerants.map((g) => g._id);

    const reclamations = await Reclamation.find({
      gerantId: { $in: gerantIds },
    })
      .populate("gerantId", "name stationId")
      .sort({ createDate: -1 });

    res.json(reclamations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching assistant reclamations" });
  }
};
exports.assignReclamationToIntervenant = async (req, res) => {
  try {
    const { reclamationId, intervenantId } = req.body;

    // Vérifier que l’intervenant existe
    const intervenant = await Intervenant.findById(intervenantId);
    if (!intervenant) {
      return res.status(404).json({ error: "Intervenant not found" });
    }

    // Mettre à jour la réclamation
    const updatedReclamation = await Reclamation.findByIdAndUpdate(
      reclamationId,
      {
        intervenantId,
        status: "In progress",
      },
      { new: true }
    )
      .populate("gerantId", "name email stationId")
      .populate("intervenantId", "name email");

    if (!updatedReclamation) {
      return res.status(404).json({ error: "Reclamation not found" });
    }

    res.json({
      message: "Reclamation assigned successfully",
      reclamation: updatedReclamation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error assigning reclamation" });
  }
};

exports.getAlertsForAssistant = async (req, res) => {
  try {
    const assistantId = req.user.id; // from JWT
    const alerts = await Alert.find({ assistantId })
      .populate("gerantId", "name email")
      .sort({ createdAt: -1 });
    res.json({
      count: alerts.length,
      alerts,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching alerts" });
  }
};

exports.markAlertAsRead = async (req, res) => {
  try {
    const { alertId } = req.body;
    const alert = await Alert.findByIdAndUpdate(
      alertId,
      { read: true },
      { new: true }
    );
    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: "Error updating alert" });
  }
};

exports.getAssistantProfile = async (req, res) => {
  try {
    // req.user.id vient du middleware d'auth (authMiddleware)
    const assistant = await Assistant.findById(req.user.id).select("name _id");

    if (!assistant) {
      return res.status(404).json({ error: "Assistant not found" });
    }

    res.json(assistant);
  } catch (error) {
    console.error("Error fetching assistant profile:", error);
    res.status(500).json({ error: "Server error" });
  }
};