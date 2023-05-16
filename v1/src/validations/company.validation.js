const Joi = require("joi");

const createCompanySchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required().min(1).max(100),
  industry: Joi.string().required().min(1).max(255),
  website: Joi.string(),
});

module.exports = { createCompanySchema };
