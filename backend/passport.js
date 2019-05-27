var passport = require("passport"),
  TwitterTokenStrategy = require("passport-twitter-token");

// Twitter Strategy
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
      consumerKey: "j4fSytOnp6A7PCnPVG1koBcZK",
      consumerSecret: "IVBU1FmBQTh6FXxLGshwYkNlgIaFbG4uqJi7VyPlbLF6ihMAdg"
    },
    TwitterTokenStrategyCallback
  )
);

const authenticateTwitter = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate("twitter-token", (err, data, info) => {
      if (err) reject(err);
      resolve({ data, info });
    })(req, res);
  });

module.exports = { authenticateTwitter };
