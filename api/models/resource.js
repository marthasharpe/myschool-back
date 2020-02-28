const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    status: { type: String, required: true },
    subject: { type: String, required: true },
    date: { type: Date, default: Date.now() }
});

// export name of model and schema of model
module.exports = mongoose.model('Resource', resourceSchema);