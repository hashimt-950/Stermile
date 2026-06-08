const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    movieId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
    },
    backdrop_path: {
      type: String,
    },
    release_date: {
      type: Date,
      required: true,
    },
    vote_average: {
      type: String,
    },
    vote_count: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Watchlist", watchlistSchema);
