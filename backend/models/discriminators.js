const User = require("./User");
const mongoose = require("mongoose");

// Gérant
const gerantSchema = new mongoose.Schema({ stationId: String });
const Gerant = User.discriminator("Gerant", gerantSchema);

// Admin
const adminSchema = new mongoose.Schema({ privileges: [String] });
const Admin = User.discriminator("Admin", adminSchema);

// Intervenant
const intervenantSchema = new mongoose.Schema({ mission: String });
const Intervenant = User.discriminator("Intervenant", intervenantSchema);

// Assistant
const assistantSchema = new mongoose.Schema({ superviseurId: String });
const Assistant = User.discriminator("Assistant", assistantSchema);

module.exports = { Gerant, Admin, Intervenant, Assistant };
