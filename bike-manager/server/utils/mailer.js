const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendEmail = (subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // You can add other recipients
    subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log("Email error:", error);
    else console.log("📧 Email sent:", info.response);
  });
};
