// registrationController.js
const Registration = require("../models/Registration");
const Event = require("../models/Event");

exports.registerEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const alreadyRegistered = await Registration.findOne({
      event: event._id, student: req.user.userId
    });
    if (alreadyRegistered) return res.status(400).json({ message: "Already registered" });

    const count = await Registration.countDocuments({ event: event._id });
    if (event.capacity <= count) return res.status(400).json({ message: "Event is full" });

    const reg = await Registration.create({ event: event._id, student: req.user.userId });
    event.registrations.push(reg._id);
    await event.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getMyRegistrations = async (req, res, next) => {
  try {
    const regs = await Registration.find({ student: req.user.userId }).populate("event");
    res.json(regs);
  } catch (err) {
    next(err);
  }
};
