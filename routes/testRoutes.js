const db = require("../database");

module.exports = (app) => {
  app.post("/api/test", (req, res) => {
    db.query(
      "INSERT INTO User VALUES (default, 'Ruichen', 'nekomimi', NULL)",
      (error, results, fields) => {
        if (error) {
          res.status(400).json({ error });
        } else if (results) {
          res.status(201).json({ results });
        }
      }
    );
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
