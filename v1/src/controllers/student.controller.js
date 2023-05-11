const httpStatus = require("http-status");
const studentService = require("../services/student.service");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");

class StudentController {
  async create(req, res, next) {
    try {
      const student = await studentService.create({
        ...req.body,
      });

      successResponse(res, httpStatus.OK, student);
    } catch (error) {
      return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async list(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const students = await studentService.list(page, limit);

      successResponse(res, httpStatus.OK, students);
    } catch (error) {
      return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }
}

module.exports = new StudentController();
