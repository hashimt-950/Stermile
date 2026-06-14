const User = require("../models/Users.model.js");
const Friend = require("../models/Friends.model.js");
const Watchlist = require("../models/Watchlist.model.js");

const searchUser = async (req, res) => {
  try {
    const query = req.query.email || "";
    if (!query.trim()) {
      return res.json([]);
    }

    const users = await User.find({
      email: { $regex: query, $options: "i" },
      _id: { $ne: req.user.id },
    }).select("name email");

    const friendDocs = await Friend.find({
      $or: [
        { requester: req.user.id, recipient: { $in: users.map((u) => u._id) } },
        { recipient: req.user.id, requester: { $in: users.map((u) => u._id) } },
      ],
    });

    const friendMap = {};
    for (const f of friendDocs) {
      const otherId =
        String(f.requester) === String(req.user.id)
          ? String(f.recipient)
          : String(f.requester);
      friendMap[otherId] = f.status;
    }

    const result = users.map((u) => ({
      _id: u._id,
      name: u.name,
      email: u.email,
      friendshipStatus: friendMap[String(u._id)] || null,
    }));

    res.json(result);
  } catch (error) {
    console.log("error searching users: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const sendRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;

    if (String(req.user.id) === String(recipientId)) {
      return res.status(400).json({ message: "cannot send request to yourself" });
    }

    const recipientExists = await User.findById(recipientId);
    if (!recipientExists) {
      return res.status(404).json({ message: "user not found" });
    }

    const existing = await Friend.findOne({
      $or: [
        { requester: req.user.id, recipient: recipientId },
        { requester: recipientId, recipient: req.user.id },
      ],
    });

    if (existing) {
      if (existing.status === "accepted") {
        return res.status(400).json({ message: "already friends" });
      }
      if (existing.status === "pending") {
        if (String(existing.recipient) === String(req.user.id)) {
          return res.status(400).json({ message: "this user already sent you a request" });
        }
        return res.status(400).json({ message: "request already sent" });
      }
    }

    const friendReq = new Friend({
      requester: req.user.id,
      recipient: recipientId,
      status: "pending",
    });

    await friendReq.save();
    res.status(201).json({ message: "friend request sent" });
  } catch (error) {
    console.log("error sending friend request: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await Friend.findOne({
      _id: requestId,
      recipient: req.user.id,
      status: "pending",
    });

    if (!request) {
      return res.status(404).json({ message: "request not found" });
    }

    request.status = "accepted";
    await request.save();

    res.json({ message: "friend request accepted" });
  } catch (error) {
    console.log("error accepting friend request: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const declineRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await Friend.findOneAndDelete({
      _id: requestId,
      recipient: req.user.id,
      status: "pending",
    });

    if (!request) {
      return res.status(404).json({ message: "request not found" });
    }

    res.json({ message: "friend request declined" });
  } catch (error) {
    console.log("error declining friend request: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getFriends = async (req, res) => {
  try {
    const friendships = await Friend.find({
      $or: [
        { requester: req.user.id, status: "accepted" },
        { recipient: req.user.id, status: "accepted" },
      ],
    });

    const friendIds = friendships.map((f) =>
      String(f.requester) === String(req.user.id) ? f.recipient : f.requester,
    );

    const friends = await User.find({ _id: { $in: friendIds } }).select("name email");

    res.json(friends);
  } catch (error) {
    console.log("error fetching friends: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const requests = await Friend.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("requester", "name email");

    res.json(requests);
  } catch (error) {
    console.log("error fetching pending requests: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getFriendWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const friendship = await Friend.findOne({
      $or: [
        { requester: req.user.id, recipient: userId, status: "accepted" },
        { requester: userId, recipient: req.user.id, status: "accepted" },
      ],
    });

    if (!friendship) {
      return res.status(403).json({ message: "not friends with this user" });
    }

    const watchlist = await Watchlist.find({ user: userId });

    res.json(watchlist);
  } catch (error) {
    console.log("error fetching friend watchlist: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  searchUser,
  sendRequest,
  acceptRequest,
  declineRequest,
  getFriends,
  getPendingRequests,
  getFriendWatchlist,
};
