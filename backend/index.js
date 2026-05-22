require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const authRoute = require("./routes/authRoutes.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Stermile is running</h1>");
});

app.post("/api/signup", authRoute);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`App is running at port: ${PORT}`);
});
