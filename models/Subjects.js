const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let subjectSchema = new Schema({
    tab: {
        type: String
    }
})