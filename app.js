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
// parse url encoded data
app.use(bodyParser.urlencoded({extended: false}));
// parse json data
app.use(bodyParser.json());

// using CORS to allow url origin (enforced by the browser)
// const allowedOrigins = ['http://localhost:3000', 'https://my-school.netlify.com/'];
// app.use(cors({
//   origin: (origin, callback) => {
//     if(allowedOrigins.indexOf(origin) !== -1){
//         return callback(null, true);
//     }
//     return callback(new Error('Not allowed by CORS'));
//   }
// }));
app.use(cors({
  origin: 'https://my-school.netlify.com'
}))
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://my-school.netlify.com/");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

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