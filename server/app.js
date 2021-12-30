if (process.env.NODE_ENV !== "production") {    // checking if we're in production or development environment
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");

// Routes
const boardRoutes = require("./routes/boards");
const cardRoutes = require("./routes/cards");
const taskRoutes = require("./routes/tasks");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/kanbanboard";

// Mongoose connection initializer
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((error) => console.log("Error occured @mongoose.connect()", error));

mongoose.set("toJSON", { virtuals: true });

// Debugging purposes
app.use(morgan("common"));
// Enable Cross Origin Policy
app.use(cors());
// Parsing incoming requests with JSON payloads
app.use(express.json());
//* Parsing request body
app.use(express.urlencoded({ extended: true }));

// Express Mongoose Sanitize
app.use(mongoSanitize());

/**
 ** Express ROUTES
 */
app.use("/", boardRoutes);

app.use("/", cardRoutes);

app.use("/", taskRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({message: "Server error!"})
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
