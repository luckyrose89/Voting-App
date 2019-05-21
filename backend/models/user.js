const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  social: {
    twitterProvider: {
      id: String,
      token: String
    }
  }
});

module.exports = mongoose.model("User", userSchema);
