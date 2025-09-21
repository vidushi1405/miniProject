const Event = require("../models/Event");
const Registration = require("../models/Registration");

// Get all events (public)
exports.getEvents = async (req, res, next) => {
  try {
    // Organizer ko populate kar sakte hain (agar model me hai)
    const events = await Event.find().populate("createdBy", "name email");
    res.json(events);
  } catch (err) {
    next(err);
  }
};

// Get single event by ID with populated fields
exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("registrations"); // agar required ho
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

// Create new event (Admin only)
exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, capacity, registrationFee } = req.body;
    // agar image upload handling hai, to req.file me milega
    const image = req.file ? req.file.filename : null;

    const event = await Event.create({
      title,
      description,
      date,
      location,
      capacity,
      registrationFee,
      bannerImage: image,
      createdBy: req.user.userId,
    });

    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

// Edit/Update event (only creator or admin)
exports.editEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check authorization: creator or admin only
    if (event.createdBy.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updates = req.body;
    if (req.file) updates.bannerImage = req.file.filename;
    Object.assign(event, updates);
    await event.save();

    res.json(event);
  } catch (err) {
    next(err);
  }
};

// Delete event (only creator or admin)
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await event.remove();

    // Related registrations bhi delete karo
    await Registration.deleteMany({ eventId: event._id });

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    next(err);
  }
};
