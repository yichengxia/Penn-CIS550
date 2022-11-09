const Joi = require("joi");

exports.userSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
