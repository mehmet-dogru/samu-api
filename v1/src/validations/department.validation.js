const Joi = require("joi");

const departmentSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
});

module.exports = { departmentSchema };
