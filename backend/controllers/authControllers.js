const bcrypt = require("bcrypt");
const User = require("../models/Users.model.js");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.status(400).json({
        error: "user already exists",
      });
    }

    const user = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    });

    await user.save();
    console.log("user created");
    res.json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("Error while signing up: ", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

const logIn = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
    });

    if (!existingUser) {
      return res.status(400).json({
        error: "user doesnot exists",
      });
    }

    const passwordCheck = await bcrypt.compare(
      req.body.password,
      existingUser.password,
    );

    if (passwordCheck === false) {
      return res.status(400).json({
        error: "incorrect password",
      });
    }

    const jtoken = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "3h" },
    );

    res.status(200).json({
      message: "login successfull",
      token: jtoken,
    });
  } catch (error) {
    console.log("Error while logging in: ", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { signUp, logIn };
