// Contains the business logic of each route
// Basically creating methods to handle information, create, read, update, delete

const User = require("../models/userModel");

// Retrieving all users from database
exports.getAllUsers = async (req, res) => {
    // Fetch users from database
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Creating new user in schema
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    // Logic to create a user in the database
    try {
        const newUser = new User({ name, email, password });
        await newUser.save()
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    res.json({ message: 'User created', data: userData });
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) return res.status(404).json({ message: `User not found. `});
        res.json(updatedUser);
    } catch (err)  {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: `User not found. `});
        return res.json(deletedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}