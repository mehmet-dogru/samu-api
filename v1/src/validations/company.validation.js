const Joi = require("joi");

const createCompanySchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required().min(1).max(100),
  industry: Joi.string().required().min(1).max(255),
  website: Joi.string(),
  startingDateOfEmployment: Joi.date().required(),
  endingDateOfEmployment: Joi.date()
});

const updateCompanySchema = Joi.object({
  name: Joi.string(),
  location: Joi.string().min(1).max(100),
  industry: Joi.string().min(1).max(255),
  website: Joi.string(),
  startingDateOfEmployment: Joi.date(),
  endingDateOfEmployment: Joi.date()
});

module.exports = { createCompanySchema,updateCompanySchema };
