const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// export name of model and schema of model
module.exports = mongoose.model("Subject", subjectSchema);
