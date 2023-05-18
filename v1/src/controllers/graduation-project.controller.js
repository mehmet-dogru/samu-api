const httpStatus = require("http-status");
const graduationProjectService = require("../services/graduation-project.service");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");

class GraduationProjectController {
  async create(req, res, next) {
    try {
      const project = await graduationProjectService.create({
        ...req.body,
        supervisor: req.userId,
      });

      successResponse(res, httpStatus.CREATED, project);
    } catch (error) {
      return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async list(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const projects = await graduationProjectService.list(page, limit);

      successResponse(res, httpStatus.OK, projects);
    } catch (error) {
      return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }
}

module.exports = new GraduationProjectController();
