const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const keys = require("../config/keys");
const db = require("../database");

passport.serializeUser((user, done) => {
  console.log("passport: serialized user is", user);
  if (!user) {
    done(error);
  } else {
    done(null, user.userId);
  }
});

passport.deserializeUser((id, done) => {
  db.query(
    `SELECT * FROM User WHERE userId = '${id}'`,
    (error, results, fields) => {
      if (error) {
        done(error);
      } else if (!results || results.length === 0) {
        done(null, false);
      } else {
        console.log("passport: deserialized user is", results);
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
          if (error) {
            done(error);
          } else if (!results || results.length === 0) {
            db.query(
              `INSERT INTO User VALUES (default, '${profile.displayName}', NULL, '${profile.id}')`,
              (error, results, fields) => {
                if (error) {
                  done(error);
                } else if (results) {
                  db.query(
                    `SELECT * FROM User WHERE authUserId = '${profile.id}'`,
                    (error, results, fields) => {
                      if (error) {
                        done(error);
                      } else if (results) {
                        console.log("passport: created user is", results);
                        done(null, results[0]);
                      }
                    }
                  );
                }
              }
            );
          } else {
            console.log("passport: existing user is", results);
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
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      console.log(profile.id);
      console.log(profile.displayName);
    }
  )
);

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log("passport: input username is", username);
    console.log("passport: input password is", password);
    db.query(
      `SELECT * FROM User WHERE username = '${username}'`,
      (error, results, fields) => {
        if (error) {
          done(error);
        } else {
          console.log("passport: stored user is", results);
          if (!results || results.length === 0) {
            console.log("The user does not exist.");
            done(null, false);
          } else if (!results[0].password || results[0].password !== password) {
            console.log(
              "Incorrect username and password combination, or sign in with third party authentication."
            );
            done(null, false);
          } else {
            console.log("Login success.");
            done(null, results[0]);
          }
        }
      }
    );
  })
);
