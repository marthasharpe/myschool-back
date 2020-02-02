const express = require('express');
const app = express();

// import routes
const subjectRoutes = require('./api/routes/subjects');
const resourceRoutes = require('./api/routes/resources');

// assign middleware for requests
app.use('/subjects', subjectRoutes);
app.use('/resources', resourceRoutes);

module.exports = app;