const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Use cors middleware to allow local cross origin 
// (Can be removed for production)
app.use(cors());

// Middleware
app.use(express.json());

// Routes
const userRoutes = require("./routes/users");
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = { app };