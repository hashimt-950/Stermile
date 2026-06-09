const express = require("express");
const watchlist = require("../controllers/watchlistControllers.js");
const protectRoute = require("../middlewares/protectRoute.js");
const router = express.Router();

router.post("/watchlist", protectRoute, watchlist.addToWatchlist);
router.get("/watchlist", protectRoute, watchlist.getWatchlist);
router.delete("/watchlist", protectRoute, watchlist.removeFromList);

module.exports = router;
