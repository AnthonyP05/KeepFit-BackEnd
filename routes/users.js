// Handles user related routes seperately

const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// Defining user routes
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);

module.exports = router;