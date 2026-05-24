const express = require("express");
const movies = require("../controllers/movieController.js");
const router = express.Router();

router.get("/nowplaying", movies.nowPlaying);

module.exports = router;
