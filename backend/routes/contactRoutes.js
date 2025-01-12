const express = require("express");
const { sendEmail } = require("../controllers/contactController");

const router = express.Router();

// Define the POST route for sending emails
router.post("/send-email", sendEmail);

module.exports = router;
