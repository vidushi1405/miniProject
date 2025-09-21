// User.js
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Store hashed password
  role: { type: String, enum: ["student", "admin"], default: "student" },
  roll_number: String
});
module.exports = mongoose.model("User", userSchema);
