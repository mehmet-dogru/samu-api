const httpStatus = require("http-status");
const postService = require("../services/post.service");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");

class PostController {
  async create(req, res, next) {
    try {
      const post = await postService.create({
        author: req.userId,
        ...req.body,
      });

      successResponse(res, httpStatus.OK, post);
    } catch (error) {
      return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async list(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const posts = await postService.list(page, limit);

      successResponse(res, httpStatus.OK, posts);
    } catch (error) {
      return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }
}

module.exports = new PostController();
