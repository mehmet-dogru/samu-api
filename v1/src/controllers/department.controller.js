const httpStatus = require("http-status");
const departmentService = require("../services/department.service.js");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");

class DepartmentController {
  async create(req, res, next) {
    try {
      const department = await departmentService.create({ ...req.body });

      successResponse(res, httpStatus.OK, department);
    } catch (error) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async update(req, res, next) {
    try {
      const department = await departmentService.update(req.params.departmentId, { ...req.body });

      successResponse(res, httpStatus.OK, department);
    } catch (error) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async list(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const departments = await departmentService.list(page, limit, {});

      successResponse(res, httpStatus.OK, departments);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }
}

module.exports = new DepartmentController();
