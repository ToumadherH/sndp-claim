const Reclamation = require("../models/reclamation");
const User = require("../models/User");
const Gerant = require("../models/discriminators");

exports.getMyReclamations = async (req, res) => {
  try {
    const gerantId = req.user.id;
    const reclamations = await Reclamation.find({ gerantId })
      .populate("intervenantId", "email")
      .sort({ createdAt: -1 });

    res.json(reclamations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching your reclamations" });
  }
};


exports.confirmResolution = async (req, res) => {
  try {
    const { reclamationId } = req.body;
    const gerantId = req.user.id;

    const reclamation = await Reclamation.findOne({ _id: reclamationId, gerantId });

    if (!reclamation) {
      return res.status(404).json({ error: "Reclamation not found or not yours" });
    }

    if (reclamation.status !== "Resolved") {
      return res.status(400).json({ error: "Reclamation must be 'Resolved' to confirm" });
    }

    reclamation.status = "Closed";
    await reclamation.save();

    res.json({ message: "Reclamation confirmed & closed", reclamation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error confirming reclamation" });
  }
};


exports.rejectResolution = async (req, res) => {
  try {
    const { reclamationId } = req.body;
    const gerantId = req.user.id;

    const reclamation = await Reclamation.findOne({ _id: reclamationId, gerantId });

    if (!reclamation) {
      return res.status(404).json({ error: "Reclamation not found or not yours" });
    }

    if (reclamation.status == "Rejected") {
      return res.status(400).json({ error: "Reclamation already rejected" });
    }

    if (reclamation.status !== "Pending") {
      return res.status(400).json({ error: "Reclamation must be 'Pending' to reject" });
    }

    reclamation.status = "Rejected";
    await reclamation.save();

    res.json({ message: "Reclamation rejected and deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error rejecting reclamation" });
  }
};



exports.getGerantProfile = async (req, res) => {
  try {
    console.log("Authenticated user ID:", req.user._id); // Debug
    
    const gerantId = req.user._id;
    
    
    const gerant = await User.findById(gerantId)
      .select("name stationId role")
      .lean();
    
    console.log("Database result:", gerant); // Debug
    
    if (!gerant) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (gerant.role !== "Gerant") {
      return res.status(403).json({ error: "Access denied - Not a Gerant" });
    }

    res.json({
      name: gerant.name,
      stationId: gerant.stationId,
    });
  } catch (error) {
    console.error("Error fetching gerant profile:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

