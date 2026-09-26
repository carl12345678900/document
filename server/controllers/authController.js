const {
  createUser,
  findUserByEmail,
  saveRefreshToken,
  saveRefreshTokenById,
  removeToken,
} = require("../models/userModel");
const authService = require("../services/auth.service");
const bcrypt = require("bcrypt");
const signToken = require("../utils/signToken");
const refreshToken = require("../utils/refreshToken");
const verifyToken = require("../utils/verifyToken");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (!email.includes("@gmail.com")) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (password.length < 5) {
    return res.status(400).json({ message: "password too short" });
  }

  if (password.length > 30) {
    return res.status(400).json({ message: "password too long" });
  }

  try {
    const exist = await findUserByEmail(email);

    if (exist) {
      return res.status(500).json({ message: "Email already exist", exist });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const result = await createUser(username, email, hashpassword);

    if (!result || result.affectedRows === 0) {
      return res.status(500).json({ message: "Registration failed" });
    }

    return res.status(201).json({
      isRegistered: true,
      message: "Registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server ERROR" });
  }
  //
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!email.includes("@gmail.com")) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password did not match" });
    }

    const token = signToken(user);
    const refresh_token = refreshToken(user);

    await saveRefreshToken(refresh_token, email);

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      islogin: true,
      message: "Login successfully",
      email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Server ERROR" });
  }
};

const logOut = async (req, res) => {
  const { refresh_token } = req.cookies;

  try {
    if (!refresh_token) {
      return res.status(401).json({
        message: "Refresh token required",
      });
    }

    const decoded = verifyToken(refresh_token);

    await removeToken(decoded.userId);

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Log out",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Server ERROR" });
  }
};

const refresh = async (req, res) => {
  try {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      return res.status(401).json({
        message: "Refresh token required",
      });
    }

    const decoded = verifyToken(refresh_token);

    // Ideally:
    // 1. Find refresh token in DB
    // 2. Check that it hasn't been revoked
    // 3. Generate new access token

    const accessToken = signToken({
      id: decoded.userId,
      role: decoded.role,
    });

    const new_refresh_token = refreshToken({ id: decoded.userId });

    await saveRefreshTokenById(new_refresh_token, decoded.userId);

    res.cookie("refresh_token", new_refresh_token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Refresh token expired or invalid",
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  await authService.forgotPassword(email);

  return res.status(200).json({
    message: "Reset link has been sent.",
  });
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({
      message: "Token and password are required",
    });
  }

  try {
    await authService.resetPassword(token, password);

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  logOut,
  refresh,
  forgotPassword,
  resetPassword,
};
