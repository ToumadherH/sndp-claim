const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  deleteAllUsers,
  updateUserName,
} = require("../controllers/userController");

router.post("/", createUser);
router.get("/", getAllUsers);
router.delete("/",deleteAllUsers);
router.put("/",updateUserName);

module.exports = router;
