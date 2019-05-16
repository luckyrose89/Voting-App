const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  question: String,
  user: Schema.Types.ObjectId
});

module.exports = mongoose.model("Poll", pollSchema);
