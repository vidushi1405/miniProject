// Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  image: String,
  capacity: { type: Number, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Registration" }],
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
