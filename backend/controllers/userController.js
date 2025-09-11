const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { Gerant, Admin, Intervenant, Assistant } = require("../models/discriminators"); // modèles hérités

const createUser = async (req, res) => {
  try {
    const { name,email, password, role, extra } = req.body; // extra = champs spécifiques au type
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let user;

    switch (role) {
      case "Gerant":
        user = new Gerant({ ...extra, name,email, password: hashedPassword });
        break;
      case "Admin":
        user = new Admin({ ...extra, name,email, password: hashedPassword });
        break;
      case "Intervenant":
        user = new Intervenant({ ...extra,name, email, password: hashedPassword });
        break;
      case "Assistant":
        user = new Assistant({ ...extra,name, email, password: hashedPassword });
        break;
      default:
        return res.status(400).json({ error: "Role invalide" });
    }

    await user.save();
    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur de création de l'utilisateur" });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "Tous les utilisateurs ont été supprimés" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

module.exports = { createUser, getAllUsers, deleteAllUsers };
