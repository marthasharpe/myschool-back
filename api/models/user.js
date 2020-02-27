const mongoose = require('mongoose');

// import resource schema
const Resource = require('../models/resource');
// import subject schema
const Subject = require('../models/subject');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {type: String, required: true},
    // resources: [ Resource ],
    // subjects: [ Subject ]
});

// export name of model and schema of model
module.exports = mongoose.model('User', userSchema);