const express = require('express');
const app = express();
// package for logging requests
const morgan = require('morgan');
// package to parse incoming data from the body such as files or JSON
const bodyParser = require('body-parser');

// import routes
const subjectRoutes = require('./api/routes/subjects');
const resourceRoutes = require('./api/routes/resources');

// use morgan logger during development
app.use(morgan('dev'));;
// parse url encoded data
app.use(bodyParser.urlencoded({extended: false}));
// parse json data
app.use(bodyParser.json());

// use middleware for requests
app.use('/subjects', subjectRoutes);
app.use('/resources', resourceRoutes);

// handle any request that does not meet the above routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

// handle errors from anywhere in the application
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;