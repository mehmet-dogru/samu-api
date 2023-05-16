const httpStatus = require("http-status");
const companyService = require("../services/company.service");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");

class CompanyController {
  async create(req, res, next) {
    try {
      const company = await companyService.create({ ...req.body });
      successResponse(res, httpStatus.CREATED, company);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async list(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const companies = await companyService.list(page, limit, {});
      if (companies.length == 0) {
        return next(new ApiError("Not Found Companies", httpStatus.BAD_REQUEST));
      }
      successResponse(res, httpStatus.OK, companies);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }
}

module.exports = new CompanyController();
