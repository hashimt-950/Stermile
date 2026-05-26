const express = require("express");
const movies = require("../controllers/movieController.js");
const router = express.Router();

router.get("/nowplaying", movies.nowPlaying);
router.get("/topRated", movies.topRated);
router.get("/discover", movies.discover);
router.get("/:id", movies.movieById);

module.exports = router;
