const express = require("express");
const movies = require("../controllers/movieController.js");
const protectRoute = require("../middlewares/protectRoute.js");
const router = express.Router();

router.get("/nowplaying", protectRoute, movies.nowPlaying);
router.get("/topRated", protectRoute, movies.topRated);
router.get("/discover", protectRoute, movies.discover);
router.get("/byGenre/:genreId", protectRoute, movies.byGenre);
router.get("/:id", protectRoute, movies.movieById);

module.exports = router;
