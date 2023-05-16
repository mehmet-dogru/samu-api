const Joi = require("joi");

const createComplaintSchema = Joi.object({
  complaintText: Joi.string().required().min(2),
  date: Joi.date(),
  status: Joi.string(),
});

const updateComplaintStatusSchema = Joi.object({
  status: Joi.string().valid("New", "In Progress", "Resolved").default("New"),
});

module.exports = { createComplaintSchema, updateComplaintStatusSchema };
