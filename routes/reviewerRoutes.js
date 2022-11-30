const db = require("../database");
const validator = require("express-joi-validation").createValidator({});
const schema = require("../schema");

module.exports = (app) => {
  app.get(
    "/api/reviewer/:reviewerId",
    validator.params(schema.reviewerParamsSchema),
    (req, res) => {
      const reviewerId = req.params.reviewerId;
      
      db.query(
        "SELECT * FROM Reviewer WHERE reviewerId = ?",
        reviewerId,
        (error, results, fields) => {
          if (error) {
            res.status(404).json({ error });
          } else if (results) {
            res.status(200).json({ results });
          }
        }
      );
    }
  );
};
