// Registration.js
const mongoose = require("mongoose");
const registrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" },
  paymentId: String,
  registrationDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Registration", registrationSchema);
