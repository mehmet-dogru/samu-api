const ApiError = require("../responses/error.response");
const httpStatus = require("http-status");
const { createStudentSchema } = require("../validations/student.validation");
const { createGraduatedSchema } = require("../validations/graduated.validation");
const ROLES = require("../references/role.reference");

const validateUserCreateByRole = () => (req, res, next) => {
  if (!req.body.role) {
    next(new ApiError("role field is required", httpStatus.UNPROCESSABLE_ENTITY));
  }

  let validate;

  switch (req.body.role) {
    case ROLES.STUDENT:
      validate = createStudentSchema.validate(req.body);
      break;
    case ROLES.GRADUATED:
      validate = createGraduatedSchema.validate(req.body);
      break;
  }

  if (validate?.error) {
    next(new ApiError(validate.error.message, httpStatus.UNPROCESSABLE_ENTITY));
  }

  return next();
};

module.exports = validateUserCreateByRole;
