const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, "your_jwt_secret");
};

module.exports = { generateToken, verifyToken };
