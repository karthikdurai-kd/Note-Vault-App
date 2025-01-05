// General error handler middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no status code is provided
  const message = err.message || "Something went wrong"; // Default message

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message: message,
  });

  if (
    process.env.NODE_ENV !== "production" &&
    process.env.NODE_ENV !== "test"
  ) {
    console.error(err); // Log the error stack trace to console
  }
};

module.exports = errorHandler;
