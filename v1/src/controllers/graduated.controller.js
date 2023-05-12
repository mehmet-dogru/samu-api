const httpStatus = require("http-status");
const graduatedService = require("../services/graduated.service");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");

class GraduatedController {
  async create(req, res, next) {
    try {
      const graduated = await graduatedService.create({ ...req.body });
      successResponse(res, httpStatus.CREATED, graduated);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async list(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const graduateds = await graduatedService.list(page, limit, {});
      successResponse(res, httpStatus.OK, graduateds);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }
}

module.exports = new GraduatedController();
