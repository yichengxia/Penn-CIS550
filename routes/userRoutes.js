const db = require("../database");
const bcrypt = require("bcrypt");
const validateSchema = require("../middlewares/validateSchema");
const schema = require("../schema");

module.exports = (app) => {
  app.post("/api/signup", validateSchema(schema.userSchema), (req, res) => {
    console.log("signup: request body is", req.body);
    const username = req.body.username;
    const password = req.body.password;
    bcrypt.hash(password, (saltRounds = 10), (error, hash) => {
      if (error) {
        return res.status(400).json({ error });
      }
      console.log("signup: hashed password is", hash);
      db.query(
        `SELECT * FROM User WHERE username = '${username}' AND password IS NOT NULL`,
        (error, results, fields) => {
          if (error) {
            res.status(404).json({ error });
          } else if (!results || results.length === 0) {
            db.query(
              `INSERT INTO User VALUES (default, '${username}', '${hash}', NULL)`,
              (error, results, fields) => {
                if (error) {
                  res.status(400).json({ error });
                } else if (results) {
                  // res.status(201).json({ message: "Account created." });
                  res.redirect("/");
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
};
