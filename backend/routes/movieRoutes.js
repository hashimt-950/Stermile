const express = require("express");
const movies = require("../controllers/movieController.js");
const router = express.Router();

router.get("/nowplaying", movies.nowPlaying);
router.get("/topRated", movies.topRated);

module.exports = router;
