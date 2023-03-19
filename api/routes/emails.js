const express = require('express');
const router = express.Router();
const db = require('../../database');
const { User } = require("../../models");

router.get('/', (req, res, next) => {
    // query using ORM
    User.findAll({attributes: ['email']})
        .then((emails) => {
            res.send(emails);
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;