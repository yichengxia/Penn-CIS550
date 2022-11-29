const db = require("../database");
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.get("/api/recommend", requireLogin, (req, res) => {
    const query = `
    SELECT restaurantName, avgRating
    FROM Restaurant t1
             LEFT JOIN Review t2 ON t1.restaurantId = t2.restaurantId
    WHERE content LIKE '%steak%'
      AND open = 'Y'
    GROUP BY t1.restaurantId
    HAVING AVG(rating) > 4
       AND COUNT(t1.restaurantId) > 30
    ORDER BY AVG(rating) DESC
    LIMIT 5;
    `;

    db.query(query, (error, results, fields) => {
      if (error) {
        res.status(404).json({ error });
      } else if (results) {
        res.status(200).json({ results });
      }
    });
  });
};
