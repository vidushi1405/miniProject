// notifications.js
const express = require("express");
const { protect } = require("../middleware/auth");
const { getNotifications, markRead } = require("../controllers/notificationController");

const router = express.Router();

router.get("/", protect, getNotifications);
router.post("/read/:id", protect, markRead);

module.exports = router;
