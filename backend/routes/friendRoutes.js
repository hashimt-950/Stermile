const express = require("express");
const friend = require("../controllers/friendController.js");
const protectRoute = require("../middlewares/protectRoute.js");
const router = express.Router();

router.get("/search", protectRoute, friend.searchUser);
router.post("/request", protectRoute, friend.sendRequest);
router.put("/accept", protectRoute, friend.acceptRequest);
router.delete("/decline", protectRoute, friend.declineRequest);
router.get("/list", protectRoute, friend.getFriends);
router.get("/pending", protectRoute, friend.getPendingRequests);
router.get("/watchlist/:userId", protectRoute, friend.getFriendWatchlist);

module.exports = router;
