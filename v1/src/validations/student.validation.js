const Joi = require("joi");
const {registerSchema} = require('./user.validation')

const createStudentSchema = registerSchema.keys({
  studentId: Joi.string().required(),
  department: Joi.string().required().min(1).max(100),
  grade: Joi.date(),
});

module.exports = { createStudentSchema };
