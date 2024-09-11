// Contains the business logic of each route
// Basically creating methods to handle information, create, read, update, delete

const User = require("../models/userModel");

// Retrieving all users from database
exports.getAllUsers = async (req, res) => {
    // Fetch users from database
    try {
        const users = await User.find();
        //res.send(users);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Creating new user in schema
exports.createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    // Logic to create a user in the database
    try {
        const newUser = new User({ name, email, password, role });
        await newUser.save()
        res.status(201).json({ message: 'User created', data: newUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
         // `req.user` should contain the authenticated user's ID after passing through `authMiddleware`
        const userId = req.user.id; 

        // Find the user by ID, excluding the password field from the returned data
        const user = await User.findById(userId).select('-password');

        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

        // If the user is found, return the user data
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
    
}

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
