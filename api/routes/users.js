const express = require('express');
const router = express.Router();
const db = require('../../database');
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

    ////////// RAW query ///////////
    // pool.query(
    //     'SELECT * FROM USERS', 
    //     (err, result) => {
    //         if(err) {
    //             console.log(err);
    //             return;
    //         }
    //         console.log(result);
    //         res.status(200).json({
    //             message: "Handling GET request to /users",
    //             data: result
    //         });
    //     }
    // );
    ////////////////////////////////
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
    
    ////////// RAW query ///////////
    // pool.query(
    //     'INSERT INTO USERS (first_name, last_name, email, pwd) VALUES(?, ?, ?, ?)', 
    //     [user.firstName, user.lastName, user.email, user.password], 
    //     (err, result) => {
    //         if(err) {
    //             console.log(err);
    //             return;
    //         }

    //         console.log(result);
    //         res.status(201).json({
    //             message: "Handling POST request to /users",
    //             createdUser: user
    //         });
    //     }
    // );
    ////////////////////////////////
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

    ////////// RAW query ///////////
    // pool.query(
    //     'SELECT * FROM USERS WHERE email = ?',
    //     [email],
    //     (err, result) => {
    //         if(err) {
    //             console.log(err);
    //             return;
    //         }
    //         console.log(result);
    //         res.status(200).json({
    //             message: "Handling GET request to /users/" + email,
    //             data: result
    //         });
    //     }
    // );
    ////////////////////////////////
});

module.exports = router;