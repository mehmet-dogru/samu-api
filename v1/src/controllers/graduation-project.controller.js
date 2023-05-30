const httpStatus = require("http-status");
const graduationProjectService = require("../services/graduation-project.service");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");

class GraduationProjectController {
  async create(req, res, next) {
    try {
      const project = await graduationProjectService.create({
        ...req.body,
        supervisor: req.userId,
      });

      successResponse(res, httpStatus.CREATED, project);
    } catch (error) {
      return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async list(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const projects = await graduationProjectService.list(page, limit);

      if (projects.length == 0) {
        return next(new ApiError("Not found projects", httpStatus.BAD_REQUEST));
      }

      successResponse(res, httpStatus.OK, projects);
    } catch (error) {
      return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async listProjectById(req, res, next) {
    try {
      const project = await graduationProjectService.findById(req.params.projectId);

      if (!project) {
        return next(new ApiError("Project not found", httpStatus.BAD_REQUEST));
      }

      successResponse(res, httpStatus.OK, project);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async update(req, res, next) {
    try {
      const project = await graduationProjectService.findById(req.params.projectId);
      if (!project) {
        return next(new ApiError("Not found Project", httpStatus.BAD_REQUEST));
      }

      if (req.userId == project.supervisor._id) {
        const updatedProject = await graduationProjectService.update(req.params.projectId, {
          name: req.body.name,
          date: req.body.date,
          description: req.body.description,
          students: req.body.students,
        });

        successResponse(res, httpStatus.OK, updatedProject);
      } else {
        return next(new ApiError("You are not the supervisor of the project", httpStatus.BAD_REQUEST));
      }
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async remove(req, res, next) {
    try {
      const project = await graduationProjectService.findById(req.params.projectId);
      if (!project) {
        return next(new ApiError("Not found Project", httpStatus.BAD_REQUEST));
      }

      if (req.userId == project.supervisor._id) {
        const deletedProject = await graduationProjectService.delete(req.params.projectId);

        successResponse(res, httpStatus.OK, deletedProject);
      } else {
        return next(new ApiError("You are not the supervisor of the project", httpStatus.BAD_REQUEST));
      }
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async search(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const projects = await graduationProjectService.list(page, limit, { name: { $regex: new RegExp(".*" + req.query.name + ".*", "i") } });
      if (projects.length == 0) {
        return next(new ApiError("Projects not found", httpStatus.BAD_REQUEST));
      }

      successResponse(res, httpStatus.OK, projects);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }
}

module.exports = new GraduationProjectController();
