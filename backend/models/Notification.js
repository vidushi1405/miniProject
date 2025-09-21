// Notification.js
const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
  message: String,
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", default: null },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Notification", notificationSchema);
