const express = require("express");
const {
  getAlluser,
  registerController,
  loginController,
} = require("../controllers/userController");

//router object
const router = express.Router();

// GET ALL USERS || GET
router.get("/all-users", getAlluser);

//CREATE  USER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

module.exports = router;
