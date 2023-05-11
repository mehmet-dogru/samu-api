const BaseService = require("./base.service");
const BaseModel = require("../models/Student");

class UserService extends BaseService {
  constructor() {
    super(BaseModel);
  }
}

module.exports = new UserService();
