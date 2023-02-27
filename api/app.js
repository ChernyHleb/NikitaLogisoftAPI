const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');
const emailsRoutes = require('./routes/emails');

// HTTP logger
app.use(morgan('dev'));
// parses bodies of incoming url requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// modifies res header to overcome CORS security concept
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// routes handling HTTP requests
app.use('/users', usersRoutes);
app.use('/emails', emailsRoutes);

// error 404 handler
app.use((req, res, next) => {
    const error = Error('404 Not found');
    error.status = 404;
    next(error);
});
// other errors handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;