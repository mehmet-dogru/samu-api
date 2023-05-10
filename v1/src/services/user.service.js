const BaseService = require("./base.service");
const BaseModel = require("../models/User");

class UserService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  list(page, limit, where) {
    const allUsers = BaseModel.find(where || {})
      .limit(limit * 1)
      .skip((page - 1) * limit);
    return allUsers;
  }
}

module.exports = new UserService();
