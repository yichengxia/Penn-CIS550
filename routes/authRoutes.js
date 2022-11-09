const passport = require("passport");
const validateSchema = require("../middlewares/validateSchema");
const schema = require("../schema");

module.exports = (app) => {
  app.get("/api/current_user", (req, res) => {
    console.log("current_user: req.user is", req.user);
    res.status(200).send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect(200, "/");
  });

  app.post(
    "/api/login",
    validateSchema(schema.userSchema),
    passport.authenticate("local"),
    (req, res) => {
      console.log("login: req.user is", req.user);
      res.redirect(200, "/");
    }
  );

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
      res.redirect(200, "/");
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
      res.redirect(200, "/");
    }
  );

  app.get("/auth/twitter", passport.authenticate("twitter"));

  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect(200, "/");
    }
  );
};
