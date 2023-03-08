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

    ////////// RAW query ///////////
    // pool.query(
    //     'SELECT email FROM USERS', 
    //     (err, result) => {
    //         if(err) {
    //             console.log(err);
    //             return;
    //         }
    //         console.log(result);
    //         res.status(200).json({
    //             message: "Handling GET request to /emails",
    //             data: result
    //         });
    //     }
    // );
    ////////////////////////////////
});

module.exports = router;