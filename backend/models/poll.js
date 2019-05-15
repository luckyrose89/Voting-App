const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Option = require("./pollOptions");

const pollSchema = new Schema({
  question: String,
  user: Schema.Types.ObjectId
});

pollSchema.post("remove", function(doc) {
  console.log("fired");
  Option.remove({ pollId: this._id }).exec();
});

module.exports = mongoose.model("Poll", pollSchema);
