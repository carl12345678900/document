const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = verifyToken;
