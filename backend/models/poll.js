const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Option = require("./pollOptions");

const pollSchema = new Schema({
  question: String
});

pollSchema.pre("remove", function(doc) {
  Option.remove({ pollId: doc._id }).exec();
});

module.exports = mongoose.model("Poll", pollSchema);
