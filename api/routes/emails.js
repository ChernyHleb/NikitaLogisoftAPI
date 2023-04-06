const express = require('express');
const router = express.Router();
const { User } = require("../../models");

router.get('/', (req, res) => {
    User.findAll({attributes: ['email']})
        .then((emails) => {
            if(emails.length == 0){
                // NO CONTENT
                res.status(204);
                res.send(null);
            }
            else{
                // SUCCESS
                res.status(200);
                res.send(emails);
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

module.exports = router;