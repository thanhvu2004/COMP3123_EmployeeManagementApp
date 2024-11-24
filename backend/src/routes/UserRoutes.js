const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/UsersModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

// POST /api/v1/user/signup
router.post(
  "/signup",
  [
    body("username").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ status: false, message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user to database
      user = new User({ username, email, password: hashedPassword });
      await user.save();

      res
        .status(201)
        .json({ message: "User created successfully.", user_id: user._id });
    } catch (err) {
      res.status(500).json({ status: false, message: "Server error" });
    }
  }
);

// POST /api/v1/user/login
router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid username or password" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid username or password" });
      }

      // Return JWT token
      const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Login successful.", jwt_token: token });
    } catch (err) {
      res.status(500).json({ status: false, message: "Server error" });
    }
  }
);

module.exports = router;
