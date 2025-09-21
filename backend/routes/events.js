// events.js
// routes/events.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  getEvents,
  getEvent,
  createEvent,
  editEvent,
  deleteEvent
} = require("../controllers/eventController");

// Public routes
router.get("/", getEvents);
router.get("/:id", getEvent);

// Protected admin routes
router.post("/", auth, role("admin"), createEvent);
router.put("/:id", auth, role("admin"), editEvent);
router.delete("/:id", auth, role("admin"), deleteEvent);

module.exports = router;
    