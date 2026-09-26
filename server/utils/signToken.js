const jwt = require("jsonwebtoken");

const signToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "15m" },
  );
};

module.exports = signToken;
