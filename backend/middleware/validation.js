// validation.js
exports.validateEvent = (req, res, next) => {
  const { title, date, capacity } = req.body;
  if (!title || !date || !capacity) {
    return res.status(400).json({ message: "Title, Date, Capacity required" });
  }
  next();
};
