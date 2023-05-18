const BaseService = require("./base.service");
const BaseModel = require("../models/User");

class UserService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  findById(id) {
    return this.BaseModel.findById(id).populate({
      path: "company",
    });;
  }

  list(page, limit, where) {
    const allUsers = BaseModel.find(where || {})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "company",
      });
    return allUsers;
  }
}

module.exports = new UserService();
