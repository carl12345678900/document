const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { sendResetEmail } = require("../utils/sendEmail.js");
const {
  searchEmail,
  updateToken,
  findUserByResetToken,
  updatePassword,
} = require("../models/userModel");

const forgotPassword = async (email) => {
  const result = await searchEmail(email);

  // Don't reveal whether the email exists
  if (result.length === 0) {
    return;
  }

  const user = result[0];

  // Generate random token
  const token = crypto.randomBytes(32).toString("hex");

  // Token expires after 15 minutes
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  await updateToken(token, expires, user.id);

  await sendResetEmail(user.email, token);
};

const resetPassword = async (token, password) => {
  const user = await findUserByResetToken(token);

  if (!user) {
    throw new Error("Invalid or expired reset link");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await updatePassword(user.id, hashedPassword);
};

module.exports = { forgotPassword, resetPassword };
