// Created throttleMiddleware for adding delays between the request
const throttleMiddleware = (req, res, next) => {
  const delay = 500; // 500ms delay for example
  setTimeout(() => {
    next();
  }, delay);
};

module.exports = throttleMiddleware;
