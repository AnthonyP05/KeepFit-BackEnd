// Handles user related routes seperately
const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { authMiddleware, authorizeRoles, authLogin } = require('../middleware/authMiddleware'); // Import middleware


// Defining user routes with authentication and authorization

// Get all users - Only 'admin' can access
router.get("/admin", authMiddleware, authorizeRoles('admin'), userController.getAllUsers);

// Create a user - Open for registration or restrict to 'admin' if needed
router.post("/create", userController.createUser); // or add authMiddleware for 'admin' access only

// Update a user - Authenticated users or 'admin' can update
router.put("/update-profile", authMiddleware, authorizeRoles('admin', 'user'), userController.updateUser);

// Delete a user - Only 'admin' can delete
router.delete("/delete-profile", authMiddleware, authorizeRoles('admin'), userController.deleteUser);

// Get a user
router.get('/get-profile', authMiddleware, userController.getUserProfile);

// Login route
router.post('/login', authLogin, userController.getUserProfile);

module.exports = router;