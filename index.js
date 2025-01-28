// Load environment variables at the very beginning
require('dotenv').config();

// Import required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Initialize the Express app
const app = express();

// Environment-specific configurations
const ENV = process.env.ENV || "prod";
const FRONTEND_URL =
    ENV === "dev"
        ? process.env.LOCAL_FRONTEND_URL
        : process.env.PROD_FRONTEND_URL;

// Use port from environment variables or default to 8000
const port = process.env.PORT || 8000;

// MongoDB URI
const MONGO_URI = process.env.MONGO_URI;

// Middleware setup
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
    origin: FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS,HEAD",
    credentials: true,
};
app.use(cors(corsOptions));

// Database connection
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Failed to connect to MongoDB", error));

// Define routes
app.get("/", (req, res) => {
    res.send("Welcome");
});

const routes = require("./routes/phonepeRoute");
app.use("/api", routes);

// Start the server
app.listen(port, () => {
    // console.log(`App is running on port ${port}`);

    // Log the static ngrok domain
    const staticNgrokURL = process.env.CALLBACKURL;
    // console.log(`Use this URL to send POST requests: ${staticNgrokURL}/api/callback`);
});
