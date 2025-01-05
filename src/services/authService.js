const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.registerUser = async ({ username, password }) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400; // Status code 400 for bad request errors like duplicate users
    throw error;
  }

  const user = new User({ username, password });
  await user.save();

  return { id: user._id, username: user.username };
};

exports.loginUser = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 400; // Staus Code 400 for invalid credentials
    throw error;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    const error = new Error("Invalid credentials");
    error.statusCode = 400; // Again, use 400 for invalid credentials
    throw error;
  }

  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
