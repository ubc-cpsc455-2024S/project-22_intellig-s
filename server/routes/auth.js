const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { generateToken, verifyToken } = require("../utils/jwtUtils");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || password === undefined || password === null)
    return res
      .status(400)
      .json({ message: "Username and password both cannot be null!" });

  try {
    const oldUser = await User.findOne({ username });
    if (oldUser)
      return res
        .status(400)
        .json({ message: "A user with this username already exists!" });
  } catch (err) {
    return res.status(500).json({
      message: `An internal error occurred with database connection. ${err.message}`,
    });
  }

  // Use a salting value of 10; higher values take a longer time to hash.
  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username: username, password: encryptedPassword });
  await newUser.save();

  const token = generateToken(newUser);
  res.status(201).json({ token: token });
});

router.post("/signin", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No user with this username exists." });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (passwordCorrect) {
      const token = generateToken(user);
      return res.status(200).json({ token: token });
    } else {
      return res
        .status(403)
        .json({ message: "Username or password is incorrect!" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error occurred with database connection.",
    });
  }
});

// New route for updating user preferences
router.post("/updatePreferences", verifyToken, async (req, res) => {
  const preferences = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    user.preferences = preferences;
    await user.save();

    res.status(200).json({ preferences: user.preferences });
  } catch (err) {
    res.status(500).json({
      message: `An internal error occurred with database connection. ${err.message}`,
    });
  }
});

module.exports = router;
