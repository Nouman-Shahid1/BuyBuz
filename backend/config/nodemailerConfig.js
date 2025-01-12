const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail SMTP
  auth: {
    user: process.env.EMAIL_USER, // Gmail address from .env
    pass: process.env.EMAIL_PASS, // App Password from .env
  },
});

module.exports = transporter;
