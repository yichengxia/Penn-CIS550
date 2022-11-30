const db = require("../database");
const requireLogin = require("../middlewares/requireLogin");
const validator = require("express-joi-validation").createValidator({});
const schema = require("../schema");

module.exports = (app) => {
  app.get(
    "/api/recommend",
    requireLogin,
    validator.query(schema.analyticsQuerySchema),
    (req, res) => {
      const userId = req.query.userId;
      const type = req.query.type;

      const bestInCategory = `
      WITH t AS (SELECT t1.restaurantId, restaurantName, avgRating, city, COUNT(*) AS reviews
             FROM Restaurant t1
                      JOIN Review t2 ON t1.restaurantId = t2.restaurantId
             WHERE categories LIKE '%Chinese%'
               AND avgRating > 4.0
             GROUP BY t2.restaurantId
             ORDER BY reviews DESC)
      SELECT restaurantId, restaurantName, avgRating, city
      FROM t
      LIMIT 5;
      `;

      const bestInReviewContent = `
      SELECT t1.restaurantId, restaurantName, avgRating, city
      FROM Restaurant t1
           LEFT JOIN Review t2 ON t1.restaurantId = t2.restaurantId
      WHERE content LIKE '%steak%'
        AND open = 'Y'
        AND city = 'Phoenix'
      GROUP BY t1.restaurantId
      HAVING AVG(rating) > 4
        AND COUNT(t1.restaurantId) > 30
      ORDER BY AVG(rating) DESC
      LIMIT 5;
      `;

      const bestEachCity = `
      WITH temp1 AS (SELECT city, MAX(usefulCount) AS max_count
               FROM Restaurant t1
                        JOIN Review t2
                             On t1.restaurantId = t2.restaurantId
               GROUP BY city)
      SELECT t1.restaurantId, restaurantName, avgRating, t1.city
      FROM Restaurant t1
               JOIN temp1 t2
                    ON t1.city = t2.city
               JOIN Review t3
                    ON t1.restaurantId = t3.restaurantId
      WHERE usefulCount = max_count
      ORDER BY t1.city
      LIMIT 5;
      `;

      const bestSameCity = `
      SELECT R.restaurantId, R.restaurantName, R.avgRating, R.city
      FROM Restaurant R,
           (SELECT city, state
            FROM (SELECT S.restaurantId, avgRating, city, state
                  FROM SavedRestaurant S
                           LEFT JOIN Restaurant R
                                     ON S.restaurantId = R.restaurantId
                  WHERE userId = ${userId}) temp
            WHERE temp.avgRating = (SELECT MAX(avgRating)
                                    FROM Restaurant
                                    WHERE restaurantId in (SELECT restaurantId FROM SavedRestaurant WHERE userId = ${userId}))
            LIMIT 1) t2
      WHERE R.city = t2.city
        AND R.state = t2.state
        AND R.reviewCount > 30
      ORDER BY avgRating DESC
      LIMIT 5;
      `;

      const recommender = {
        BEST_IN_CATEGORY: bestInCategory,
        BEST_IN_REVIEW_CONTENT: bestInReviewContent,
        BEST_EACH_CITY: bestEachCity,
        BEST_SAME_CITY: bestSameCity,
      };

      db.query(recommender[type], (error, results, fields) => {
        if (error) {
          res.status(404).json({ error });
        } else if (results) {
          res.status(200).json({ results });
        }
      });
    }
  );
};
