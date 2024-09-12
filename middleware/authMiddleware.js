// Middleware for tasks like authentication, logging, etc.
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Authentication: Verifies the JWT token to ensure the user is authenticated.
const authMiddleware = (req, res, next) => {
    const header = req.header('Authorization');

    if (!header) return res.status(401).json({ message: "Access Denied "});

    const token = header.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        // Verify tokin logic 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }

}

// Authorization: Checks if the authenticated user has one of the allowed roles.
const authorizeRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            
            if (!allowedRoles.includes(user.roles)) {
                return res.status(403).json({ message: 'Permission Denied' });
            }
            next();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

const authLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Invalid email or password e' });
  
      // Check password
      const isMatch = await user.comparePassword(password);
      
      if (!isMatch) return res.status(401).json({ message: 'Invalid email or password p' });
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id, role: user.roles[0] }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
      });
  
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


module.exports = {authMiddleware, authorizeRoles, authLogin};