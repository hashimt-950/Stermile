require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const router = require("./routes/authRoutes.js");

app.use(express.json());

app.use("/api/auth", router);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`App is running at port: ${PORT}`);
});
