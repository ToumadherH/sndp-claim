const Reclamation = require("../models/reclamation");
const {Intervenant}=require("../models/discriminators");

//Get all reclamations assigned to a specific intervenant
exports.getReclamationsForIntervenant = async (req, res) => {
  try {
    const intervenantId = req.user.id; // from JWT

    const reclamations = await Reclamation.find({ intervenantId })
      .populate("gerantId", "email") // you can add stationId or name if needed
      .sort({ createDate: -1 });

    res.json(reclamations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching intervenant reclamations" });
  }
};

//Update reclamation status 
exports.updateReclamationStatus = async (req, res) => {
  try {
    const intervenantId = req.user.id;
    const { reclamationId } = req.body;

    // Find reclamation & check ownership
    const reclamation = await Reclamation.findOne({
      _id: reclamationId,
      intervenantId,
    });

    if (!reclamation) {
      return res
        .status(404)
        .json({ error: "Reclamation not found or not assigned to you" });
    }

    if (reclamation.status !== "In progress") {
      return res
        .status(400)
        .json({ error: "Reclamation must be 'In Progress' to resolve" });
    }

    reclamation.status = "Resolved";
    await reclamation.save();

    res.json({
      message: "Reclamation marked as resolved",
      reclamation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating reclamation status" });
  }
};

exports.getAllIntervenants = async (req, res) => {
  try {
    const intervenants = await Intervenant.find().select("_id name");
    res.json(intervenants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};