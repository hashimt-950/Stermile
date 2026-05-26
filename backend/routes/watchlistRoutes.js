const express = require("express");
const watchlist = require("../controllers/watchlistControllers.js");
const router = express.Router();

router.post("/watchlist", watchlist.addToWatchlist);

module.exports = router;
