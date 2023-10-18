const userModel = require("../models/userModel");

const bcrypt = require("bcryptjs");

// create user register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Fill All fields",
      });
    }

    // existence check for user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User already exists",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 8);
    // password=hashedpassword

    // save new user
    const user = new userModel({ username, password: hashedpassword, email });
    await user.save();

    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In Register Callback",
      success: false,
      error: error.message, // Use error.message to get the error description.
    });
  }
};

//get all user
exports.getAlluser = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In Get All Users",
      success: false,
      error: error.message, // Use error.message to get the error description.
    });
  }
};

// login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.satus(200).send({
        success: false,
        message: "Email is note registerd",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In Login Users",
      success: false,
      error: error.message, // Use error.message to get the error description.
    });
  }
};
