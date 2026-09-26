const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetEmail = async (email, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Your Password",
    html: `
      <h2>Password Reset</h2>

      <p>You requested to reset your password.</p>

      <p>
        Click the button below to create a new password:
      </p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>This link expires in 15 minutes.</p>
    `,
  });
};

module.exports = { sendResetEmail };
