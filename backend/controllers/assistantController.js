// controllers/assistantController.js
const Reclamation = require("../models/reclamation");
const { Gerant, Intervenant } = require("../models/discriminators");

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
