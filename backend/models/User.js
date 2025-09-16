// User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String, required: true, unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "organizer", "student"], default: "student" },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
