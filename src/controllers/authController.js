const authService = require("../services/authService");

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await authService.loginUser(req.body);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
