// Handles the routing for different endpoints.

const express = require("express");
const router = express.Router();

// Importing route files
const userRoutes = require("./users");

// Defining Routes
router.get("/", (req, res) => res.send("Hello World!"));
router.use("/users", userRoutes); // Delegates to user-specific routes

module.exports = { router };