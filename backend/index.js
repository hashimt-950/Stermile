require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const authRouter = require("./routes/authRoutes.js");
const movieRouter = require("./routes/movieRoutes.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/movies", movieRouter);

app.get("/", (req, res) => {
  res.send("<h2>Stermile backend is live</h2>");
});

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`App is running at port: ${PORT}`);
});
