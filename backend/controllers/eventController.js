// eventController.js
const Event = require("../models/Event");
const Registration = require("../models/Registration");

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate("organizer");
    res.json(events);
  } catch (err) {
    next(err);
  }
};

exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate("organizer registrations");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, capacity } = req.body;
    const image = req.file ? req.file.filename : null;
    const event = await Event.create({
      title,
      description,
      date,
      location,
      capacity,
      image,
      organizer: req.user.userId,
    });
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

exports.editEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizer.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    const updates = req.body;
    if (req.file) updates.image = req.file.filename;
    Object.assign(event, updates);
    await event.save();
    res.json(event);
  } catch (err) {
    next(err);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    await Registration.deleteMany({ event: event._id });
    res.json({ message: "Event deleted" });
  } catch (err) {
    next(err);
  }
};
