const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  question: String,
  answer: [{ option: String, votes: Number }]
});

module.exports = mongoose.model("Poll", pollSchema);
