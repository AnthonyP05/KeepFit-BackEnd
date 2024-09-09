// Middleware for tasks like authentication, logging, etc.

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: "Access Denied" });


    try {
        // Verify tokin logic 
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }

}

module.exports = { authMiddleware };