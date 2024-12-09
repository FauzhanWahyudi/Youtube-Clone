const jwt = require("jsonwebtoken");

const signToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET);
};

const verifyToken = (access_token) => {
  return jwt.verify(access_token, process.env.JWT_SECRET);
};

module.exports = { signToken, verifyToken };
