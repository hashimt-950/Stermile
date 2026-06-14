require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const authRouter = require("./routes/authRoutes.js");
const movieRouter = require("./routes/movieRoutes.js");
const watchlistRouter = require("./routes/watchlistRoutes.js");
const friendRouter = require("./routes/friendRoutes.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/movies", movieRouter);
app.use("/api/watchlist", watchlistRouter);
app.use("/api/friends", friendRouter);

app.get("/", (req, res) => {
  res.send("<h2>Stermile backend is live</h2>");
});

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`App is running at port: ${PORT}`);
});
