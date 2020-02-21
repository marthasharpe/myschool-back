const express = require('express');
const app = express();
// package for logging requests
const morgan = require('morgan');
// package to parse incoming data from the body such as files or JSON
const bodyParser = require('body-parser');
// import Mongoose as Mongo client
const mongoose = require('mongoose');
// import environment variables
const dotenv = require('dotenv')
dotenv.config();
const url = process.env.MONGODB_URI;

// import routes
const subjectRoutes = require('./api/routes/subjects');
const resourceRoutes = require('./api/routes/resources');

// connect to Mongo Client
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// use morgan logger during development
app.use(morgan('dev'));;
// parse url encoded data
app.use(bodyParser.urlencoded({extended: false}));
// parse json data
app.use(bodyParser.json());


// handle CORS errors (enforced by the browser)
app.use((req, res, next) => {
    // add headers to response
    res.header('Access-Control-Allow-Origin', '*'); // allow access to any origin
    res.header('Access-Control-Allow-Headers', '*'); // allow any headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next(); // to move on to route handling
})

// routes which should handle requests
app.use('/subjects', subjectRoutes);
app.use('/resources', resourceRoutes);

// handle any request that does not match the above routes
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