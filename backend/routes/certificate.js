// certificate.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { generateCertificate } = require("../controllers/certificateController");

router.get("/:eventId", auth, generateCertificate);

module.exports = router;
