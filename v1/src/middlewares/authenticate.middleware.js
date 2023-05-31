const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const ApiError = require("../responses/error.response");

async function verifyToken(req, res, next) {
  try {
    const authorization = req.header("Authorization");
    if (!authorization) {
      return next(new ApiError("Acces denied. No token provided", httpStatus.UNAUTHORIZED));
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (error, decoded) => {
      if (error) {
        return next(new ApiError(error.message, httpStatus.UNAUTHORIZED));
      }

      req.userId = decoded._id;
      next();
    });
  } catch (error) {
    return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
  }
}

module.exports = verifyToken;
