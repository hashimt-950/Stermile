const express = require("express");
const watchlist = require("../controllers/watchlistControllers.js");
const protectRoute = require("../middlewares/protectRoute.js");
const router = express.Router();

router.post("/watchlist", protectRoute, watchlist.addToWatchlist);

module.exports = router;
