const express = require('express');
const router = express.Router();
const { User } = require("../../models");

// GET REQUEST
router.get('/', (req, res) => {
    User.findAll()
        .then((users) => {
            if(users.length == 0){
                res.sendStatus(204);
            }
            else {
                //SUCCESS
                res.status(200);
                res.send(users);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
            res.json({
                message: "Internal Server Error",
                error: err.message
            });
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

    User.findAll({where: {email: user.email}})
    .then((users) => {
        if(users.length != 0){
            res.status(400);
                res.json({
                    message: "Bad Request",
                    error: "User with such email already exists"
                });
        }
        else{
            let error = "";
            if(!validateUserName(user.firstName)){
                error += "first_name format is incorrect";
            }
            else if(!validateUserName(user.lastName)){
                error += "last_name format is incorrect";
            }
            else if(!validateEmail(user.email)){
                error += "email format is incorrect";
            }

            if(error == ""){
                User.create({
                    first_name: user.firstName,
                    last_name: user.lastName,
                    email: user.email,
                    pwd: user.password
                })
                .then(() => {
                    //SUCCESS
                    res.status(201);
                    res.send("Created User");
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500);
                    res.json({
                        message: "Internal Server Error",
                        error: err.message
                    });
                });
            }
            else{
                res.status(400);
                res.json({
                    message: "Bad Request",
                    error: error
                });
            }

        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500);
        res.json({
            message: "Internal Server Error",
            error: err.message
        });
    });
});

// GET USER BY EMAIL REQUEST
router.get('/:userEmail', (req, res) => {
    const email = req.params.userEmail;

    if(!validateEmail(email)){
        res.status(400);
        res.json({
            message: "Bad Request",
            error: "Email format is incorrect"
        });
    }
    else{
        User.findAll({where: {email: email}})
        .then((users) => {
            if(users.length == 0){
                res.status(404);
                res.json({
                    message: "The user does not exist"
                });
            }
            else{
                // SUCCESS
                res.status(200);
                res.send(users);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
            res.json({
                message: "Internal Server Error",
                error: err.message
            });
        });
    }
});

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateUserName(name){
    var re = /^[A-Z][a-z]+$/;
    return re.test(name);
}

module.exports = router;