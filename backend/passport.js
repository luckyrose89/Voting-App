const passport = require("passport");
var TwitterTokenStrategy = require("passport-twitter-token");

// TWITTER STRATEGY
const TwitterTokenStrategyCallback = (
  accessToken,
  refreshToken,
  profile,
  done
) =>
  done(null, {
    accessToken,
    refreshToken,
    profile
  });

passport.use(
  new TwitterTokenStrategy(
    {
      clientID: "j4fSytOnp6A7PCnPVG1koBcZK ",
      clientSecret: "IVBU1FmBQTh6FXxLGshwYkNlgIaFbG4uqJi7VyPlbLF6ihMAdg"
    },
    TwitterTokenStrategyCallback
  )
);

// authenticate function
const authenticateTwitter = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      "twitter-token",
      { session: false },
      (err, data, info) => {
        if (err) reject(err);
        resolve({ data, info });
      }
    )(req, res);
  });

module.exports = { authenticateTwitter };
