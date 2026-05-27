const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
  try {
    const reqHeader = req.headers.authorization;

    if (!reqHeader) {
      return res.json({
        message: "not token found",
      });
    }

    const token = reqHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("unable to verify token: ", error.message);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = protectRoute;
