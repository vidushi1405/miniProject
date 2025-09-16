// registrations.js
const express = require("express");
const { protect } = require("../middleware/auth");
const {
  registerEvent,
  getMyRegistrations
} = require("../controllers/registrationController");

const router = express.Router();

router.post("/", protect, registerEvent);
router.get("/mine", protect, getMyRegistrations);

module.exports = router;
