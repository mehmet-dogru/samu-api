const Joi = require("joi");
const { registerSchema } = require("./user.validation");

//* Burası düzeltilebilir veya iyileştirilebilir
const createAcademicianSchema = registerSchema.keys({
  department: Joi.string().required().min(1).max(100),
});

module.exports = { createAcademicianSchema };
