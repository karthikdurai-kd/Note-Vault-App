const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimiter = require("./middlewares/rateLimiter");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./utils/errorHandler");
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");
const throttleMiddleware = require("./middlewares/throttleMiddleware");
const swaggerSpec = require("./config/swagger");

const app = express();

// Adding middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(rateLimiter);

// Applying Throttling for notesRoutes
app.use("/api/notes", throttleMiddleware);

// Adding Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Linking authRoutes, notesRoutes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
