const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  twitterProvider: {
    id: String,
    token: String
  }
});

// Model methods
userSchema.statics.upsertTwitterUser = function(
  token,
  tokenSecret,
  profile,
  cb
) {
  var that = this;
  return this.findOne(
    {
      "twitterProvider.id": profile.id
    },
    function(err, user) {
      // no user was found, lets create a new one
      if (!user) {
        var newUser = new that({
          name: profile.name,
          twitterProvider: {
            id: profile.id,
            token: token,
            tokenSecret: tokenSecret
          }
        });

        newUser.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    }
  );
};

module.exports = mongoose.model("User", userSchema);
