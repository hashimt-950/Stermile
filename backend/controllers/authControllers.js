const bcrypt = require("bcrypt");
const User = require("../models/Users.model.js");

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
  }
};

module.exports = signUp;
