const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  deleteAllUsers,
} = require("../controllers/userController");

router.post("/", createUser);
router.get("/", getAllUsers);
router.delete("/",deleteAllUsers)

module.exports = router;
