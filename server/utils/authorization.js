const verifyToken = require("./verifyToken");

const authorization = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Authentication required");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    req.user = decoded;
    console.log("authenticated");

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authorization;
