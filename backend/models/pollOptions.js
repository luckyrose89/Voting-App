const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollOptionsSchema = new Schema({
  answer: {
    option: String,
    votes: Number,
    pollId: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model("Option", pollOptionsSchema);
