const express = require("express");
const auth = require("../controllers/authControllers.js");

const router = express.Router();

router.post("/signup", auth.signUp);
router.post("/login", auth.logIn);

module.exports = router;
