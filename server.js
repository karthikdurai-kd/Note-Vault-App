require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");

// Fetching environment variable and port
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || "development";

// Setting Up MongoDB URL based on the development or production environment
let mongoURI;

if (NODE_ENV === "production") {
  mongoURI = process.env.MONGO_URI;
} else {
  mongoURI = process.env.MONGO_URI;
}

// Connection to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
