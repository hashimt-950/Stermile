require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const User = require("./models/Users.model.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Stermile is running</h1>");
});

app.post("/api/register", async (req, res) => {
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
});

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`App is running at port: ${PORT}`);
});
