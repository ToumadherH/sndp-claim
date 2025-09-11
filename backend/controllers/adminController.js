const { Gerant, Assistant } = require("../models/discriminators");

//Change Assistant for a Gerant
exports.changeAssistantForGerant = async (req, res) => {
  try {
    const { gerantId, newAssistantId } = req.body;

    const gerant = await Gerant.findById(gerantId);
    if (!gerant) return res.status(404).json({ error: "Gerant not found" });

    const assistant = await Assistant.findById(newAssistantId);
    if (!assistant) return res.status(404).json({ error: "Assistant not found" });

    gerant.assistantId = newAssistantId;
    await gerant.save();

    res.json({ message: "Assistant updated successfully", gerant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating assistant for gerant" });
  }
};

//Change Station for a Gerant
exports.changeStationForGerant = async (req, res) => {
  try {
    const { gerantId, newStationId } = req.body;

    const gerant = await Gerant.findById(gerantId);
    if (!gerant) return res.status(404).json({ error: "Gerant not found" });

    //just update the stationId directly
    gerant.stationId = newStationId;
    await gerant.save();

    res.json({ message: "Station updated successfully", gerant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating station for gerant" });
  }
};
