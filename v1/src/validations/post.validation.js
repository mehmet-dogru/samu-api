const Joi = require("joi");

const createPostSchema = Joi.object({
  caption: Joi.string().required().min(1).max(100),
  imageUrl: Joi.string(),
  createdAt: Joi.date(),
  visibility: Joi.string().required(),
});

const commentValidation = Joi.object({
  text: Joi.string().required(),
  createdAt: Joi.date(),
});

module.exports = { createPostSchema, commentValidation };
