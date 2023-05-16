const httpStatus = require("http-status");
const complaintService = require("../services/complaint.service");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");

class ComplaintController {
  async create(req, res, next) {
    try {
      const complaintContent = {
        userId: req.userId,
        ...req.body,
      };
      const complaint = await complaintService.create(complaintContent);
      successResponse(res, httpStatus.CREATED, complaint);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async list(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const complaints = await complaintService.list(page, limit, {});
      if (complaints.length == 0) {
        return next(new ApiError("Not Found Complaint", httpStatus.BAD_REQUEST));
      }
      successResponse(res, httpStatus.OK, complaints);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async updateStatus(req, res, next) {
    try {
      const complaintStatus = {
        status: req.body.status,
      };

      const complaint = await complaintService.update(req.params.id, complaintStatus);

      if (!complaint) {
        return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
      }
      successResponse(res, httpStatus.OK, complaint);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }
}

module.exports = new ComplaintController();
