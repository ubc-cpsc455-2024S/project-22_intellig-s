const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      imageId: user.imageId,
      preferences: user.preferences,
    },
    "your_jwt_secret",
    { expiresIn: "1h" }
  );
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (token) {
      jwt.verify(token, "your_jwt_secret", (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Token is not valid" });
        }
        req.user = decoded;
        next();
      });
    } else {
      return res.status(403).json({ message: "Token is not provided" });
    }
  } else {
    return res
      .status(403)
      .json({ message: "Authorization header is not provided" });
  }
};

module.exports = { generateToken, verifyToken };
