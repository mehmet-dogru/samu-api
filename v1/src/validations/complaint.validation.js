const Joi = require("joi");

const createComplaintSchema = Joi.object({
  complaintText: Joi.string().required().min(2),
  date: Joi.date(),
  status: Joi.string(),
});

module.exports = { createComplaintSchema };
