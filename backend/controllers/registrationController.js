const Registration = require("../models/Registration");
const Event = require("../models/Event");

// Register student for an event
exports.registerEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if already registered
    const alreadyRegistered = await Registration.findOne({
      eventId: event._id,
      studentId: req.user.userId,
    });
    if (alreadyRegistered)
      return res.status(400).json({ message: "Already registered" });

    // Check capacity
    const count = await Registration.countDocuments({ eventId: event._id });
    if (event.capacity <= count)
      return res.status(400).json({ message: "Event is full" });

    // Create registration record with pending payment
    const reg = await Registration.create({
      eventId: event._id,
      studentId: req.user.userId,
      paymentStatus: "pending",
      registrationDate: new Date(),
    });

    res
      .status(201)
      .json({ message: "Registered successfully", registrationId: reg._id });
  } catch (err) {
    next(err);
  }
};

// Get registrations of logged-in student
exports.getMyRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ studentId: req.user.userId })
      .populate("eventId")
      .exec();
    res.json(registrations);
  } catch (err) {
    next(err);
  }
};

// Get participants of an event (admin only)
exports.getEventParticipants = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const registrations = await Registration.find({ eventId })
      .populate("studentId", "name email roll_number")
      .exec();
    res.json(registrations);
  } catch (err) {
    next(err);
  }
};

// Update payment status (admin only)
exports.updatePaymentStatus = async (req, res, next) => {
  try {
    const { registrationId, status } = req.body;
    const reg = await Registration.findById(registrationId);
    if (!reg) return res.status(404).json({ message: "Registration not found" });

    reg.paymentStatus = status;
    await reg.save();
    res.json({ message: "Payment status updated", registrationId: reg._id });
  } catch (err) {
    next(err);
  }
};

// Cancel registration (student only)
exports.cancelRegistration = async (req, res, next) => {
  try {
    const reg = await Registration.findById(req.params.id);
    if (!reg) return res.status(404).json({ message: "Registration not found" });
    if (reg.studentId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Registration cancelled" });
  } catch (err) {
    next(err);
  }
};
