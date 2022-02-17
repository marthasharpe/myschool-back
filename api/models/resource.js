const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String },
  status: { type: String, required: true },
  subject: { type: String },
  date: { type: Date, default: Date.now() },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// export name of model and schema of model
module.exports = mongoose.model("Resource", resourceSchema);
