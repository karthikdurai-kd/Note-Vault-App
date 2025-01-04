// src/utils/errorHandler.js

// General error handler middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message: message,
  });

  // Loging the error for debugging
  console.error(err);
};

module.exports = errorHandler;
