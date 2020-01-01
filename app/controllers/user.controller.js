const User = require('../models/user.model.js');

const Swal = require('sweetalert2');

// Create and Save a new User
exports.register = (req, res) => {
    // create new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send("User saved successfully");
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });

};

exports.getUsers = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};
