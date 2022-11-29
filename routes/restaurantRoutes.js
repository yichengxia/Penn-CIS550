const db = require("../database");

module.exports = (app) => {
  app.get("/api/restaurants", (req, res) => {
    const name = req.query.name ? "%" + req.query.name + "%" : "%";
    const city = req.query.city ? "%" + req.query.city + "%" : "%";
    const category = req.query.category ? "%" + req.query.category + "%" : "%";
    const open = req.query.open ? "%" + req.query.open + "%" : "%";
    const ratingLow = req.query.ratingLow ? req.query.ratingLow : "1";
    const ratingHigh = req.query.ratingHigh ? req.query.ratingHigh : "5";
    const sort = req.query.sort ? req.query.sort : "avgRating";

    const query = `
    SELECT * FROM Restaurant
    WHERE restaurantName LIKE ?
      AND city LIKE ?
      AND categories LIKE ?
      AND open LIKE ?
      AND avgRating >= ?
      AND avgRating <= ?   
    ORDER BY ${sort} DESC
    `;

    db.query(
      query,
      [name, city, category, open, ratingLow, ratingHigh],
      (error, results, fields) => {
        if (error) {
          res.status(404).json({ error });
        } else if (results) {
          res.status(200).json({ results });
        }
      }
    );
  });

  app.get("/api/restaurant/:restaurantId", (req, res) => {
    const restaurantId = req.params.restaurantId ? req.params.restaurantId : "";

    db.query(
      "SELECT * FROM Restaurant WHERE restaurantId = ?",
      restaurantId,
      (error, results, fields) => {
        if (error) {
          res.status(404).json({ error });
        } else if (results) {
          res.status(200).json({ results });
        }
      }
    );
  });
};
