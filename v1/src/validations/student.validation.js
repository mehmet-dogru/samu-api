const Joi = require("joi");

const createStudentSchema = Joi.object({
  user: Joi.string().required(),
  studentId: Joi.string().required(),
  department: Joi.string().required().min(1).max(100),
  grade: Joi.date(),
});

module.exports = { createStudentSchema };
