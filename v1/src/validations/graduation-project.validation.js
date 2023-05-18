const Joi = require("joi");

const createGraduationProjectSchema = Joi.object({
  name: Joi.string().required(),
  date: Joi.date().required(),
  description: Joi.string().min(5),
  students: Joi.array().items(Joi.string().length(24).hex().required()),
});

// const updateGraduationProjectSchema = Joi.object({
//   name: Joi.string().required(),
//   date: Joi.date().required(),
//   description: Joi.string().min(5),
//   students: Joi.array().items(Joi.string().length(24).hex().required()),
//   supervisor: Joi.array().items(Joi.string().length(24).hex().required()),
// });

module.exports = { createGraduationProjectSchema };
