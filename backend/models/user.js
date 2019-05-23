const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: String,
  social: {
    twitterProvider: {
      id: String,
      token: String
    }
  }
});

// Model methods
userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      name: this.name,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    "secret"
  );
};

userSchema.statics.upsertTwitterUser = async function({
  accessToken,
  refreshToken,
  profile
}) {
  const User = this;

  const user = await User.findOne({ "social.twitterProvider.id": profile.id });

  // no user was found, lets create a new one
  if (!user) {
    const newUser = await User.create({
      name: profile.displayName || `${profile.familyName} ${profile.givenName}`,
      "social.twitterProvider": {
        id: profile.id,
        token: accessToken
      }
    });

    return newUser;
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
