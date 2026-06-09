const Watchlist = require("../models/Watchlist.model.js");

const addToWatchlist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const existingMovie = await Watchlist.findOne({
      user: req.user.id,
      movieId: req.body.movieId,
    });

    if (existingMovie) {
      return res.status(400).json({
        message: "movie already exists",
      });
    }

    if (!req.body.movieId || !req.body.title) {
      return res.status(400).json({
        message: "Missing required Fields",
      });
    }

    const watchlist = new Watchlist({
      user: req.user.id,
      movieId: req.body.movieId,
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      backdrop_path: req.body.backdrop_path,
      release_date: req.body.release_date,
      vote_average: req.body.vote_average,
      vote_count: req.body.vote_count,
    });

    await watchlist.save();
    res.json({
      message: "saved movie to watchlist",
    });
  } catch (error) {
    console.log("error while saving data: ", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

const getWatchlist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }
    const userWatchlist = await Watchlist.find({ user: req.user.id });

    res.status(200).json(userWatchlist);
  } catch (error) {
    console.log("error while fetching watchlist: ", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

const removeFromList = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const deleteMovie = await Watchlist.findOneAndDelete({
      user: req.user.id,
      movieId: req.body.movieId,
    });

    if (!deleteMovie) {
      return res.status(404).json({
        message: "movie not found in the list ",
      });
    }

    res.status(200).json({
      message: "movie successfully removed from the watchlist ",
    });
  } catch (error) {
    console.log("error while fetching watchlist: ", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { addToWatchlist, getWatchlist, removeFromList };
