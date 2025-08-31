const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");
const { successResponse, errorResponse } = require("../helper/responseHelper");
const config = require("../config/config");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return errorResponse(res, "Email already exists", 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { userId: user._id }, 
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    return successResponse(res, "User registered successfully", { token, user });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, "Invalid email or password", 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, "Invalid email or password", 400);

    const token = jwt.sign(
      { userId: user._id }, 
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    return successResponse(res, "Login successful", { token, user });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

module.exports = { signup, login };
