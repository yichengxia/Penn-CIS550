const db = require("../database");
const validator = require("express-joi-validation").createValidator({});
const schema = require("../schema");

module.exports = (app) => {
  app.get(
    "/api/reviews",
    validator.query(schema.reviewQuerySchema),
    (req, res) => {
      const restaurantId = req.query.restaurantId ? req.query.restaurantId : "";
      const reviewerId = req.query.reviewerId ? req.query.reviewerId : "";
      const rating = req.query.rating ? "%" + req.query.rating + "%" : "%";
      const sort = req.query.sort ? req.query.sort : "date";

      const queryByRestaurantDefault = `
      SELECT t3.name        as reviewerName,
             t3.reviewCount as reviewerReviewCount,
             t1.reviewerId,
             t1.reviewId,
             t1.rating,
             t1.funnyCount,
             t1.usefulCount,
             t1.coolCount,
             t1.content,
             t1.date
      FROM Review t1,
           Restaurant t2,
           Reviewer t3
      WHERE t1.restaurantId = t2.restaurantId
        AND t1.reviewerId = t3.reviewerId
        AND t1.restaurantId = ?
        AND t1.rating LIKE ?
      ORDER BY str_to_date(t1.date, '%d/%m/%Y') DESC
      `;

      const queryByRestaurantSort = `
      SELECT t3.name        as reviewerName,
             t3.reviewCount as reviewerReviewCount,
             t1.reviewerId,
             t1.reviewId,
             t1.rating,
             t1.funnyCount,
             t1.usefulCount,
             t1.coolCount,
             t1.content,
             t1.date
      FROM Review t1,
           Restaurant t2,
           Reviewer t3
      WHERE t1.restaurantId = t2.restaurantId
        AND t1.reviewerId = t3.reviewerId
        AND t1.restaurantId = ?
        AND t1.rating LIKE ?
      ORDER BY ${sort} DESC
      `;

      const queryByReviewerDefault = `
      SELECT t2.restaurantName,
             t1.restaurantId,
             t1.reviewId,
             t1.rating,
             t1.funnyCount,
             t1.usefulCount,
             t1.coolCount,
             t1.content,
             t1.date,
             RM.imageUrl
      FROM Review t1,
           Restaurant t2,
           Reviewer t3,
           RestaurantMedia RM
      WHERE t1.restaurantId = t2.restaurantId
        AND t1.reviewerId = t3.reviewerId
        AND t1.restaurantId = RM.restaurantId
        AND t1.reviewerId = ?
        AND t1.rating LIKE ?
      ORDER BY str_to_date(t1.date, '%d/%m/%Y') DESC
      `;

      const queryByReviewerSort = `
      SELECT t2.restaurantName,
             t1.restaurantId,
             t1.reviewId,
             t1.rating,
             t1.funnyCount,
             t1.usefulCount,
             t1.coolCount,
             t1.content,
             t1.date,
             RM.imageUrl
      FROM Review t1,
           Restaurant t2,
           Reviewer t3,
           RestaurantMedia RM
      WHERE t1.restaurantId = t2.restaurantId
        AND t1.reviewerId = t3.reviewerId
        AND t1.restaurantId = RM.restaurantId
        AND t1.reviewerId = ?
        AND t1.rating LIKE ?
      ORDER BY ${sort} DESC
      `;

      let query;
      if (restaurantId) {
        if (sort === "date") {
          query = queryByRestaurantDefault;
        } else {
          query = queryByRestaurantSort;
        }
      } else {
        if (sort === "date") {
          query = queryByReviewerDefault;
        } else {
          query = queryByReviewerSort;
        }
      }

      db.query(
        query,
        restaurantId ? [restaurantId, rating] : [reviewerId, rating],
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
