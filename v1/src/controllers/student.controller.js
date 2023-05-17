const httpStatus = require("http-status");
const studentService = require("../services/student.service");
const userService = require("../services/user.service");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");
const {passwordToHash} = require("../scripts/utils/helper")

class StudentController {
  async create(req, res, next) {
    try {

      const hash = passwordToHash(req.body.password);


      let user = await userService.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        profileImage: req.body.profileImage,
        role: req.body.role,
      })

      let student = await studentService.create({
        userId: user._id,
        studentId: req.body.studentId,
        department: req.body.department,
        grade: req.body.grade,
      })

      user = user.toObject();
      student = student.toObject();

      successResponse(res, httpStatus.OK, {...student,...user});
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
