// controllers/assistantController.js
const Reclamation = require("../models/reclamation");
const { Gerant } = require("../models/discriminators");

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
