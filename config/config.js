require("dotenv").config();

module.exports = {
  dbUri: process.env.DB,
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET,
};
