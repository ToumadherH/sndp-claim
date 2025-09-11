const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Accès non autorisé, token manquant" });
    }

    const token = authHeader.split(" ")[1]; // Récupérer le token après "Bearer"
    const decoded = jwt.verify(token, JWT_SECRET);

    // Chercher l’utilisateur et l’ajouter à req.user
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }

    next(); // passe au contrôleur
  } catch (error) {
    res.status(401).json({ error: "Token invalide ou expiré" });
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: "Accès refusé: droits insuffisants" });
    }
    next();
  };
};

module.exports = { authMiddleware, requireRole };