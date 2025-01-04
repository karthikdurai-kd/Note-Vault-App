const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.registerUser = async ({ username, password }) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error("User already exists");

  const user = new User({ username, password });
  await user.save();

  return { id: user._id, username: user.username };
};

exports.loginUser = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Invalid credentials");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error("Invalid credentials");

  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
