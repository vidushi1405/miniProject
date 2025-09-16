// auth.js
const express = require("express");
const { register, login, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const router = express.Router();

// @route   POST /api/auth/register
router.post("/register", register);

// @route   POST /api/auth/login
router.post("/login", login);

// @route   GET /api/auth/profile
router.get("/profile", protect, getProfile);

module.exports = router;
