// REMOVE IN PROD
const db = require("../database");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.post("/api/test", (req, res) => {
    console.log("test: request body is", req.body);
    bcrypt.hash(req.body.password, (saltRounds = 10), (error, hash) => {
      if (error) {
        return next(error);
      }
      console.log("test: hashed password is", hash);
      db.query(
        `INSERT INTO User VALUES (default, '${req.body.username}', '${hash}', NULL)`,
        (error, results, fields) => {
          if (error) {
            res.status(400).json({ error });
          } else if (results) {
            res.status(201).json({ results });
          }
        }
      );
    });
  });

  app.get("/api/test", (req, res) => {
    db.query("SELECT * FROM User", (error, results, fields) => {
      if (error) {
        res.status(404).json({ error });
      } else if (results) {
        res.status(200).json({ results });
      }
    });
  });
};
