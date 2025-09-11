const mongoose = require("mongoose");

const reclamationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "Fuel Shortage",
      "Pump Issue",
      "Cash Register Problem",
      "Electricity Failure",
      "Maintenance Request",
    ], //types possibles
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved", "Rejected", "Closed"],
    default: "Pending",
  },
  createDate: { type: Date, default: Date.now },
  gerantId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  intervenantId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Reclamation", reclamationSchema);
