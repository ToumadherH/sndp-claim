const mongoose = require("mongoose");

const reclamationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  status: { type: String, default: "En attente" },
  createDate: { type: Date, default: Date.now },
  gerantId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  technicienId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports=mongoose.model('Reclamation',reclamationSchema);