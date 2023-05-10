const ApiError = require("../responses/error.response");
const httpStatus = require("http-status");

const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);

  if (error) {
    next(new ApiError(error.message, httpStatus.UNPROCESSABLE_ENTITY));
  }

  return next();
};

module.exports = validate;
