const User = require('../models/userModel');

const newUser = new User({
    name: "Jane Doe",
    email: "jane.doe@gmail.com",
    password: "janedoe123"
});


newUser.save()
    .then((user) => {
        console.log(`Successfully saved user: ${user}`);
    }).catch((err) => {
        console.error(`Error saving user: ${err}`);
    })