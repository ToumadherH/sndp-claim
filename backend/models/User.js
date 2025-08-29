const mongoose = require("mongoose");
const { collection } = require("./reclamation");
const options = { discriminatorKey: "role", collection: "users" }; //heritage

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String, // hash plus tard
    enum: ["admin", "gerant", "assistant","intervenant"], // rôles possibles
  },
  options
);
const User = mongoose.model("User", userSchema);

module.exports = User;
