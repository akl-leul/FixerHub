const Joi = require('joi');

const validateSignup = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().required().pattern(/^[0-9]{10,15}$/),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  return schema.validate(data);
};

const validateJob = (data) => {
  const schema = Joi.object({
    category_id: Joi.string().uuid().required(),
    sub_categories: Joi.array().items(
      Joi.object({
        sub_category_id: Joi.string().uuid().required(),
        price: Joi.number().positive().required()
      })
    ).required(),
    location: Joi.object({
      latitude: Joi.number().required(),
      longitude: Joi.number().required()
    }).required()
  });
  return schema.validate(data);
};

module.exports = { validateSignup, validateLogin, validateJob };