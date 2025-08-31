const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helper/responseHelper");
const { User } = require("../models/index");
const config = require("../config/config");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    //console.log("Token received:", token);

    if (!token) return errorResponse(res, "No token provided", 401);

    const decoded = jwt.verify(token, config.jwtSecret);
    //console.log("Decoded payload:", decoded);

    const user = await User.findById(decoded.userId);
    if (!user) return errorResponse(res, "User not found", 401);

    req.user = user;
    next();
  } catch (error) {
    //console.error("Token verify error:", error.message);
    return errorResponse(res, "Invalid or expired token", 401);
  }
};

module.exports = authMiddleware;
