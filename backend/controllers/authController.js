const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Admin/User Signup
exports.signup = async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ email, password, role });
    const token = createToken(user._id, user.role);
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

// Admin/User Login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    if (user.isBlocked)
      return res.status(400).json({ message: "User being blocked!" });
    const token = createToken(user._id, user.role);
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ message: "Login successful", role: user.role });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { newPassword } = req.body; // Only need the newPassword from the request body

  try {
    // The user is already authenticated, and their data is available in req.user
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set the new password for the user
    user.password = newPassword;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};
// Logout controller
exports.logout = (req, res, next) => {
  try {
    // Clear the JWT cookie by setting its expiration date to a past date
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
