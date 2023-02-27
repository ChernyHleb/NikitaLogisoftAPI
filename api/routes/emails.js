const express = require('express');
const router = express.Router();
const pool = require('../../database');

router.get('/', (req, res, next) => {
    pool.query(
        'SELECT email FROM USERS', 
        (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log(result);
            res.status(200).json({
                message: "Handling GET request to /emails",
                data: result
            });
        }
    );
});

module.exports = router;