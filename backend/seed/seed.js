// seed.js
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany();
  await Event.deleteMany();
  await Registration.deleteMany();

  const admin = await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: await require("bcryptjs").hash("Admin@123", 10),
    role: "admin"
  });

  const organizer = await User.create({
    name: "Organizer",
    email: "organizer@example.com",
    password: await require("bcryptjs").hash("Organizer@123", 10),
    role: "organizer"
  });

  const student1 = await User.create({
    name: "Student One",
    email: "student1@example.com",
    password: await require("bcryptjs").hash("Student@123", 10),
    role: "student"
  });

  const student2 = await User.create({
    name: "Student Two",
    email: "student2@example.com",
    password: await require("bcryptjs").hash("Student@123", 10),
    role: "student"
  });

  const events = await Event.create([
    {
      title: "Orientation",
      description: "Welcome new students!",
      date: new Date(Date.now()+86400000),
      location: "Auditorium",
      image: "",
      capacity: 50,
      organizer: organizer._id,
      registrations: []
    },
    {
      title: "Hackathon",
      description: "Code for 24 hours!",
      date: new Date(Date.now()+86400000*2),
      location: "Lab 1",
      image: "",
      capacity: 30,
      organizer: organizer._id,
      registrations: []
    },
    {
      title: "Seminar",
      description: "Tech talks",
      date: new Date(Date.now()+86400000*3),
      location: "Seminar Hall",
      image: "",
      capacity: 100,
      organizer: admin._id,
      registrations: []
    },
    {
      title: "Sports Day",
      description: "Football tournament",
      date: new Date(Date.now()+86400000*4),
      location: "Field",
      image: "",
      capacity: 40,
      organizer: admin._id,
      registrations: []
    },
    {
      title: "Cultural Fest",
      description: "Performances all day",
      date: new Date(Date.now()+86400000*5),
      location: "Open Ground",
      image: "",
      capacity: 200,
      organizer: organizer._id,
      registrations: []
    }
  ]);

  console.log("Seed complete!");
  process.exit();
}

seed();
