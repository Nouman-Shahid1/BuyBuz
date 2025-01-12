const nodemailer = require("nodemailer");

// Configure the SMTP transporter
const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025, // Use MailHog or Postal's SMTP port
  secure: false,
});

// Define the sendEmail controller
const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const mailOptions = {
    from: `${name} <${email}>`,
    to: "your-receiving-email@example.com", // Replace with the actual recipient's email
    subject: `New Contact Form Submission from ${name}`,
    text: message,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
};

module.exports = { sendEmail };
