const Joi = require("joi");

const createPostSchema = Joi.object({
  title: Joi.string().required().min(1).max(100),
  content: Joi.string().required().min(1).max(500),
  imageUrl: Joi.string(),
  createdAt: Joi.date(),
});

module.exports = { createPostSchema };
