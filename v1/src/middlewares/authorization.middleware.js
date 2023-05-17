const httpStatus = require("http-status");
const userService = require("../services/user.service");
const ApiError = require("../responses/error.response");

const verifyAndAuthorizationToken = (roles) => async (req, res, next) => {
  try {
    const user = await userService.findById(req.userId);

    const role = roles.some((item) => item.includes(user.role));
    if (role) {
      next();
    } else {
      return next(new ApiError("You don't have permission for this action", httpStatus.FORBIDDEN));
    }
  } catch (error) {
    return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
  }
};

module.exports = verifyAndAuthorizationToken;
