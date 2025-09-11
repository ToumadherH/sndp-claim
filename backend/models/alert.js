const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  assistantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  gerantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  count: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false } // assistant can "mark as read"
});

module.exports = mongoose.model("Alert", alertSchema);
