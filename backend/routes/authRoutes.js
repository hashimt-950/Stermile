const User = require("../models/Users.model.js");

const authRoute = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    console.log("user created");
    res.json(user);
  } catch (error) {
    console.log("error while registering user: ", error.message);
  }
};

module.exports = authRoute;
