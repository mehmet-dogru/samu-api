const httpStatus = require("http-status");
const ApiError = require("../responses/error.response");

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json(err.toJSON());
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    error: {
      message: "Internal Server Error",
    },
    success: false,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
  });
};

module.exports = ErrorHandler;
