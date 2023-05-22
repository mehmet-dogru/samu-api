const httpStatus = require("http-status");
const postService = require("../services/post.service");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");
const path = require("path");

class PostController {
  async create(req, res, next) {
    try {
      let fileName;

      if (req?.files?.imageUrl) {
        const extension = path.extname(req.files.imageUrl.name);
        fileName = `${req.userId}${Date.now()}${extension}`;
        const folderPath = path.join(__dirname, "../", "uploads/posts", fileName);

        req.files.imageUrl.mv(folderPath, function (err) {
          if (err) return next(new ApiError(err.message, httpStatus.INTERNAL_SERVER_ERROR));
        });
      }
      const post = await postService.create({
        author: req.userId,
        imageUrl: fileName,
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
