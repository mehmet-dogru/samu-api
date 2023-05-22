const BaseService = require("./base.service");
const BaseModel = require("../models/GraduationProject");

class GraduationProjectService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  findById(id) {
    return this.BaseModel.findById(id)
      .populate({
        path: "students",
        select: "firstName lastName profileImage studentId department",
      })
      .populate({
        path: "supervisor",
        select: "firstName lastName profileImage department",
      });
  }

  list(page, limit, where) {
    const projects = BaseModel.find(where || {})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "students",
        select: "firstName lastName profileImage studentId department",
      })
      .populate({
        path: "supervisor",
        select: "firstName lastName profileImage department",
      });
    return projects;
  }
}

module.exports = new GraduationProjectService();
