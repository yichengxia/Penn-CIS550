const Joi = require("joi");

exports.authBodySchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

exports.restaurantQuerySchema = Joi.object().keys({
  name: Joi.string().allow(""),
  city: Joi.string().allow(""),
  category: Joi.string().allow(""),
  open: Joi.string().valid("Y", "", "N"),
  ratingLow: Joi.string().valid("1", "4.5", "4", "3.5"),
  ratingHigh: Joi.string().valid("5"),
  sort: Joi.string().valid("avgRating", "reviewCount"),
});

exports.restaurantParamsSchema = Joi.object().keys({
  restaurantId: Joi.string().required(),
});

exports.reviewerParamsSchema = Joi.object().keys({
  reviewerId: Joi.string().required(),
});

exports.reviewQuerySchema = Joi.object().keys({
  restaurantId: Joi.string().allow(""),
  reviewerId: Joi.string().allow(""),
  rating: Joi.string().valid("", "5", "4", "3", "2", "1"),
  sort: Joi.string().valid(
    "date",
    "rating",
    "usefulCount",
    "funnyCount",
    "coolCount"
  ),
});

exports.userBodySchema = Joi.object().keys({
  userId: Joi.number().required(),
  restaurantId: Joi.string().required(),
  lastUpdated: Joi.string().required(),
});

exports.userParamsSchema = Joi.object().keys({
  restaurantId: Joi.string().required(),
});

exports.savedRestaurantsQuerySchema = Joi.object().keys({
  userId: Joi.number().required(),
  sort: Joi.string().valid("lastUpdated", "restaurantName"),
});

exports.savedRestaurantQuerySchema = Joi.object().keys({
  userId: Joi.number().required(),
  restaurantId: Joi.string().required(),
});

exports.analyticsQuerySchema = Joi.object().keys({
  userId: Joi.number().required(),
  type: Joi.string()
    .valid(
      "BEST_IN_CATEGORY",
      "BEST_IN_REVIEW_CONTENT",
      "BEST_EACH_CITY",
      "BEST_SAME_CITY"
    )
    .required(),
});
