const Joi = require("joi");

const createComplaintSchema = Joi.object({
  complaintText: Joi.string().required().min(2),
  date: Joi.date(),
  status: Joi.string().valid("New", "In Progress", "Resolved").default("New"),
  visibility: Joi.string().valid("Public", "Private", "AdminOnly").default("Public"),
});

const updateComplaintStatusSchema = Joi.object({
  status: Joi.string().valid("New", "In Progress", "Resolved"),
});

const updateComplaintVisibilitySchema = Joi.object({
  visibility: Joi.string().valid("Public", "Private", "AdminOnly"),
});

module.exports = { createComplaintSchema, updateComplaintStatusSchema, updateComplaintVisibilitySchema };
