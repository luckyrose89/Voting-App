const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let pollSchema = new Schema({
  question: { type: String, required: true },
  answers: [
    {
      option: { type: String, required: true },
      votes: { type: Number }
    }
  ]
});

module.exports = mongoose.model("poll", pollSchema);
