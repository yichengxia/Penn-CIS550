const passport = require("passport");
const bcrypt = require("bcrypt");
const db = require("../database");
const validateSchema = require("../middlewares/validateSchema");
const schema = require("../schema");

module.exports = (app) => {
  app.get("/api/current_user", (req, res) => {
    res.status(200).send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.post(
    "/api/login",
    validateSchema(schema.userSchema),
    passport.authenticate("local"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.post("/api/signup", validateSchema(schema.userSchema), (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, (saltRounds = 10), (error, hash) => {
      if (error) {
        return res.status(400).json({ error });
      }
      db.query(
        "SELECT * FROM User WHERE username = ? AND password IS NOT NULL",
        username,
        (error, results, fields) => {
          if (error) {
            res.status(404).json({ error });
          } else if (!results || results.length === 0) {
            db.query(
              "INSERT INTO User VALUES (default, ?, ?, NULL)",
              [username, hash],
              (error, results, fields) => {
                if (error) {
                  res.status(400).json({ error });
                } else if (results) {
                  res.status(201).json({ message: "Account created." });
                }
              }
            );
          } else {
            res.status(409).json({ error: "User already registered." });
          }
        }
      );
    });
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile"],
    })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/auth/twitter", passport.authenticate("twitter"));

  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/");
    }
  );
};
