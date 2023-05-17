const BaseService = require("./base.service");
const BaseModel = require("../models/Complaint");

class ComplaintService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  list(page, limit, where) {
    const complaints = BaseModel.find(where || {})
      .limit(limit * 1)
      .skip((page - 1) * limit).populate({
        path : "user",
        select : "firstName lastName email profileImage"
      });
    return complaints;
  }
}

module.exports = new ComplaintService();
