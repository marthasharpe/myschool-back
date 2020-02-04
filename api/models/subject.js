const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tab: String
});

// export name of model and schema of model
module.exports = mongoose.model('Subject', subjectSchema);