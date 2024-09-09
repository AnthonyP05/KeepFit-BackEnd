// Contains the business logic of each route

exports.getAllUsers = (req, res) => {
    // Fetch users from database
    res.json({ message: 'Fetching all users '});
};

exports.createUser = (req, res) => {
    const userData = req.body;
    // Logic to create a user in the database
    res.json({ message: 'User created', data: userData });
};