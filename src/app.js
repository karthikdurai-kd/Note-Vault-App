const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimiter = require("./middlewares/rateLimiter");
const errorHandler = require("./utils/errorHandler");
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(rateLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
