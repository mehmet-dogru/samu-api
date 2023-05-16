const BaseService = require("./base.service");
const BaseModel = require("../models/Company");

class CompanyService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  list(page, limit, where) {
    const companies = BaseModel.find(where || {})
      .limit(limit * 1)
      .skip((page - 1) * limit);
    return companies;
  }
}

module.exports = new CompanyService();
