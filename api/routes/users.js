const express = require('express');
const router = express.Router();
const { User } = require("../../models");

// GET REQUEST
router.get('/', (req, res) => {
    // query using ORM
    User.findAll()
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            console.log(err);
        });
});

// POST REQUEST
router.post('/', (req, res) => {
    const user = {
        firstName: req.body.first_name,
        lastName: req.body.last_name, 
        email: req.body.email, 
        password: req.body.pwd 
    };

    // query using ORM
    User.create({
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            pwd: user.password
        })
        .then(() => {
            res.send("created User");
        })
        .catch((err) => {
            console.log(err);
        });
});

// GET BY EMAIL REQUEST
router.get('/:userEmail', (req, res) => {
    const email = req.params.userEmail;

    // query using ORM
    User.findAll({where: {email: email}})
    .then((users) => {
        res.send(users);
    })
    .catch((err) => {
        console.log(err);
    });
});

module.exports = router;