const express = require('express');
const router = express.Router();
const pool = require('../../database');

// GET REQUEST
router.get('/', (req, res) => {
    pool.query(
        'SELECT * FROM USERS', 
        (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log(result);
            res.status(200).json({
                message: "Handling GET request to /users",
                data: result
            });
        }
    );
});

// POST REQUEST
router.post('/', (req, res) => {
    const user = {
        firstName: req.body.first_name,
        lastName: req.body.last_name, 
        email: req.body.email, 
        password: req.body.pwd 
    };

    pool.query(
        'INSERT INTO USERS (first_name, last_name, email, pwd) VALUES(?, ?, ?, ?)', 
        [user.firstName, user.lastName, user.email, user.password], 
        (err, result) => {
            if(err) {
                console.log(err);
                return;
            }

            console.log(result);
            res.status(201).json({
                message: "Handling POST request to /users",
                createdUser: user
            });
        }
    );
});

// GET BY EMAIL REQUEST
router.get('/:userEmail', (req, res) => {
    const email = req.params.userEmail;
    pool.query(
        'SELECT * FROM USERS WHERE email = ?',
        [email],
        (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log(result);
            res.status(200).json({
                message: "Handling GET request to /users/" + email,
                data: result
            });
        }
    );
});

module.exports = router;