// import express
const express = require('express');
const app = express();
// import package for handling cors
const cors = require('cors');
// package for logging requests
const morgan = require('morgan');
// package to parse incoming data from the body such as files or JSON
const bodyParser = require('body-parser');
// import Mongoose as Mongo client
const mongoose = require('mongoose');
// import environment variables
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGODB_URI;

// import routes
const subjectRoutes = require('./api/routes/subjects');
const resourceRoutes = require('./api/routes/resources');
const userRoutes = require('./api/routes/users');

// connect to Mongo Client
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// use morgan logger during development
app.use(morgan('dev'));;
// parse url encoded data, extended to nested data
app.use(bodyParser.urlencoded({extended: true}));
// parse json data
app.use(bodyParser.json());

// using CORS to allow url origin (enforced by the browser)
// const whitelist = ['https://my-school.netlify.com/', 'http://localhost:3000']
// const corsOptions = {
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//       } else {
//         callback(new Error('Not allowed by CORS'))
//       }
//     }
//   }
app.use(cors());

// routes which should handle requests
app.use('/subjects', subjectRoutes);
app.use('/resources', resourceRoutes);
app.use('/users', userRoutes);

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