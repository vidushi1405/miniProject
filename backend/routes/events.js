// events.js
const express = require("express");
const router = express.Router();
const Event = require("../models/Event"); // Ensure Event model bana hua ho

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

module.exports = router;
