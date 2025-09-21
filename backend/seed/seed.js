const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");
const bcrypt = require("bcryptjs");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany();
  await Event.deleteMany();
  await Registration.deleteMany();

  const admin = await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: await bcrypt.hash("Admin@123", 10),
    role: "admin", // corrected role
    roll_number: "ADMIN001"
  });

  // Organizer replaced by admin role
  const organizer = await User.create({
    name: "Organizer",
    email: "organizer@example.com",
    password: await bcrypt.hash("Organizer@123", 10),
    role: "admin", // changed from organizer to admin
    roll_number: "ADMIN002"
  });

  const student1 = await User.create({
    name: "Student One",
    email: "student1@example.com",
    password: await bcrypt.hash("Student@123", 10),
    role: "student",
    roll_number: "STU001"
  });

  const student2 = await User.create({
    name: "Student Two",
    email: "student2@example.com",
    password: await bcrypt.hash("Student@123", 10),
    role: "student",
    roll_number: "STU002"
  });

  const events = await Event.create([
    {
      title: "Orientation",
      description: "Welcome new students!",
      date: new Date(Date.now() + 86400000),
      location: "Auditorium",
      bannerImage: "",
      capacity: 50,
      createdBy: organizer._id // changed field name to match Event model
    },
    {
      title: "Hackathon",
      description: "Code for 24 hours!",
      date: new Date(Date.now() + 86400000 * 2),
      location: "Lab 1",
      bannerImage: "",
      capacity: 30,
      createdBy: organizer._id
    },
    {
      title: "Seminar",
      description: "Tech talks",
      date: new Date(Date.now() + 86400000 * 3),
      location: "Seminar Hall",
      bannerImage: "",
      capacity: 100,
      createdBy: admin._id
    },
    {
      title: "Sports Day",
      description: "Football tournament",
      date: new Date(Date.now() + 86400000 * 4),
      location: "Field",
      bannerImage: "",
      capacity: 40,
      createdBy: admin._id
    },
    {
      title: "Cultural Fest",
      description: "Performances all day",
      date: new Date(Date.now() + 86400000 * 5),
      location: "Open Ground",
      bannerImage: "",
      capacity: 200,
      createdBy: organizer._id
    }
  ]);

  console.log("Seed complete!");
  process.exit();
}

seed();

