const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

//middlewares (fcts qui s'exécutent avant d'atteindre une route)
app.use(cors()); //norbtou l front bl back
app.use(express.json()); //pour les requetes json

//Routes
const reclamationRoutes = require("./routes/reclamationRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const intervenantRoutes =require("./routes/intervenantRoutes");
const gerantRoutes=require("./routes/gerantRoutes");
const assistantRoutes=require("./routes/assistantRoutes");
//test

//console.log("ReclamationRoutes =", reclamationRoutes);

app.use("/api/reclamations", reclamationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/intervenant",intervenantRoutes);
app.use("/api/gerant",gerantRoutes);
app.use("/api/assistant",assistantRoutes);
//Connexion à la base de données
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
