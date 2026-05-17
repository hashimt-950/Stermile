require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Stermile is running</h1>");
});

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`App is running at port: ${PORT}`);
});
