const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");
const db = require("../database");

passport.serializeUser((user, done) => {
  console.log("banana1", user);
  done(null, user.authUserId);
});

passport.deserializeUser((id, done) => {
  db.query(
    `SELECT * FROM User WHERE authUserId = '${id}'`,
    (error, results, fields) => {
      if (error) {
        done(error);
      } else if (results && results.length > 0) {
        console.log("banana2", results);
        done(null, results[0]);
      }
    }
  );
});

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
          console.log("banana3", results);
          if (!results || results.length === 0) {
            db.query(
              `INSERT INTO User VALUES (default, '${profile.displayName}', NULL, '${profile.id}')`,
              (error, results, fields) => {
                if (results) {
                  db.query(
                    `SELECT * FROM User WHERE authUserId = '${profile.id}'`,
                    (error, results, fields) => {
                      if (results) {
                        console.log("banana4", results);
                        done(null, results[0]);
                      }
                    }
                  );
                }
              }
            );
          } else {
            console.log("banana5", results);
            done(null, results[0]);
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
    (accessToken, refreshToken, profile, done) => {}
  )
);
