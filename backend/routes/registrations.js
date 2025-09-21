// registrations.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  registerEvent,
  getMyRegistrations,
  getEventParticipants,
  updatePaymentStatus,
  cancelRegistration
} = require("../controllers/registrationController");

// Student registers for event
router.post("/:eventId", auth, role("student"), registerEvent);

// Student's registered events
router.get("/mine", auth, role("student"), getMyRegistrations);

// Admin views participants for event
router.get("/event/:eventId", auth, role("admin"), getEventParticipants);

// Admin updates payment status
router.put("/payment", auth, role("admin"), updatePaymentStatus);

// Student cancels registration
router.delete("/:id", auth, role("student"), cancelRegistration);

module.exports = router;


