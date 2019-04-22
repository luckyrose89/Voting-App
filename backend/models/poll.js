const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  question: String
});

module.exports = mongoose.model("Poll", pollSchema);
