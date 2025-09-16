// notificationController.js
const Notification = require("../models/Notification");

exports.getNotifications = async (req, res, next) => {
  try {
    const notes = await Notification.find({ user: req.user.userId });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

exports.markRead = async (req, res, next) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: "Notification marked as read" });
  } catch (err) {
    next(err);
  }
};
