const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const keys = require("../config/keys");
const db = require("../database");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  console.log("passport: serialized user is", user);
  if (!user) {
    return done(error);
  }
  return done(null, user.userId);
});

passport.deserializeUser((id, done) => {
  db.query(
    `SELECT * FROM User WHERE userId = '${id}'`,
    (error, results, fields) => {
      if (error) {
        return done(error);
      }
      if (!results || results.length === 0) {
        return done(null, false);
      }
      console.log("passport: deserialized user is", results);
      return done(null, results[0]);
    }
  );
});

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log("passport: input username is", username);
    console.log("passport: input password is", password);
    db.query(
      `SELECT * FROM User WHERE username = '${username}' AND password IS NOT NULL`,
      (error, results, fields) => {
        if (error) {
          return done(error);
        }
        console.log("passport: stored user is", results);
        if (!results || results.length === 0) {
          console.log(
            "The user either does not exist, or needs to sign in with third party authentication."
          );
          return done(null, false);
        }
        bcrypt.compare(
          password,
          (hash = results[0].password),
          (error, result) => {
            if (error) {
              return done(error);
            }
            if (!result) {
              console.log("Incorrect username and password combination.");
              return done(null, false);
            }
            console.log("Login success.");
            return done(null, results[0]);
          }
        );
      }
    );
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      db.query(
        `SELECT * FROM User WHERE authUserId = '${profile.id}'`,
        (error, results, fields) => {
          if (error) {
            return done(error);
          }
          if (!results || results.length === 0) {
            db.query(
              `INSERT INTO User VALUES (default, '${profile.displayName}', NULL, '${profile.id}')`,
              (error, results, fields) => {
                if (error) {
                  return done(error);
                }
                if (results) {
                  db.query(
                    `SELECT * FROM User WHERE authUserId = '${profile.id}'`,
                    (error, results, fields) => {
                      if (error) {
                        return done(error);
                      }
                      if (results) {
                        console.log("passport: created user is", results);
                        return done(null, results[0]);
                      }
                    }
                  );
                }
              }
            );
          } else {
            console.log("passport: existing user is", results);
            return done(null, results[0]);
          }
        }
      );
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      console.log(profile.id);
      console.log(profile.displayName);
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitterConsumerKey,
      consumerSecret: keys.twitterConsumerSecret,
      callbackURL: "/auth/twitter/callback",
      proxy: true,
    },
    (token, tokenSecret, profile, done) => {
      console.log(profile);
    }
  )
);
