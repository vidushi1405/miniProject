// auth.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register); // students
router.post("/login", login); // both

module.exports = router;
