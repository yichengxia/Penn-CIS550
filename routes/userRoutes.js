const db = require("../database");
const requireLogin = require("../middlewares/requireLogin");
const validator = require("express-joi-validation").createValidator({});
const schema = require("../schema");

module.exports = (app) => {
  app.post(
    "/api/save",
    requireLogin,
    validator.body(schema.userBodySchema),
    (req, res) => {
      const userId = req.body.userId;
      const restaurantId = req.body.restaurantId;
      const lastUpdated = req.body.lastUpdated;

      db.query(
        "INSERT INTO SavedRestaurant VALUES (?, ?, ?)",
        [userId, restaurantId, lastUpdated],
        (error, results, fields) => {
          if (error) {
            res.status(404).json({ error });
          } else if (results) {
            res.status(201).json({ results });
          }
        }
      );
    }
  );

  app.delete(
    "/api/unsave/:restaurantId",
    requireLogin,
    validator.params(schema.userParamsSchema),
    (req, res) => {
      const restaurantId = req.params.restaurantId;

      db.query(
        "DELETE FROM SavedRestaurant WHERE restaurantId = ?",
        restaurantId,
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

  app.get(
    "/api/saved_restaurants",
    requireLogin,
    validator.query(schema.savedRestaurantsQuerySchema),
    (req, res) => {
      const userId = req.query.userId;
      const sort = req.query.sort ? req.query.sort : "lastUpdated";

      const queryDefault = `
      SELECT *
      FROM SavedRestaurant
               NATURAL JOIN Restaurant
      WHERE userId = ?
      ORDER BY str_to_date(lastUpdated, '%d/%m/%Y') DESC
      `;

      const querySort = `
      SELECT *
      FROM SavedRestaurant
               NATURAL JOIN Restaurant
      WHERE userId = ?
      ORDER BY ${sort}
      `;

      db.query(
        sort === "lastUpdated" ? queryDefault : querySort,
        userId,
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

  app.get(
    "/api/saved_restaurant",
    validator.query(schema.savedRestaurantQuerySchema),
    (req, res) => {
      const userId = req.query.userId;
      const restaurantId = req.query.restaurantId;

      db.query(
        `
        SELECT *
        FROM SavedRestaurant
        WHERE userId = ?
          AND restaurantId = ?
        `,
        [userId, restaurantId],
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
