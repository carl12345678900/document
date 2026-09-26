const jwt = require("jsonwebtoken");

const refreshToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" },
  );
};

module.exports = refreshToken;
