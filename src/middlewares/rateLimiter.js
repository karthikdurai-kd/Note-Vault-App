const rateLimit = require("express-rate-limit");

// Setting up rate limitter to avoid callback loop by the client
module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes time frame
  max: 100, // limiting each user to 100 requests per windowMs
  message: { error: "Too many requests, please try again later" }, // sending error response to user if they exceed the request which was set above
  headers: true,
});
