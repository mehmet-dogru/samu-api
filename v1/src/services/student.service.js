const BaseService = require("./base.service");
const BaseModel = require("../models/Student");

class StudentService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  list(page, limit, where) {
    const students = BaseModel.find(where || {})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "user",
        select: "firstName lastName email profileImage",
      });
    return students;
  }
}

module.exports = new StudentService();
