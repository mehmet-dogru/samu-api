const Joi = require("joi");
const { registerSchema } = require("./user.validation");

const createStudentSchema = registerSchema.keys({
  studentId: Joi.string().required(),
  department: Joi.string().required(),
  grade: Joi.date(),
});

module.exports = { createStudentSchema };
