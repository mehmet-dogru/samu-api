const BaseService = require("./base.service");
const BaseModel = require("../models/Department");

class DepartmentService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  list(page, limit, where) {
    const departments = BaseModel.find(where || {})
      .limit(limit * 1)
      .skip((page - 1) * limit);

    return departments;
  }
}

module.exports = new DepartmentService();
