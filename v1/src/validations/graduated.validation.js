const Joi = require("joi");

const createGraduatedSchema = Joi.object({
  userId: Joi.string().required(),
  department: Joi.string().required().min(1).max(100),
  workedAt: Joi.string().min(2).max(20),
  startingDateOfEmployment: Joi.date(),
  endingDateOfEmployment: Joi.date(),
});

module.exports = { createGraduatedSchema };
