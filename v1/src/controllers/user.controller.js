const httpStatus = require("http-status");
const { passwordToHash, generateAccessToken } = require("../scripts/utils/helper");
const userService = require("../services/user.service");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");
const ROLES = require("../references/role.reference");
const path = require("path");
const cloudinary = require("cloudinary").v2;

class UserController {
  async register(req, res, next) {
    try {
      const hash = passwordToHash(req.body.password);

      const user = await userService.create({ ...req.body, password: hash });

      successResponse(res, httpStatus.OK, user);
    } catch (error) {
      return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const hashedPassword = passwordToHash(password);

      const user = await userService.findOne({ email, password: hashedPassword });

      if (!user) {
        return next(new ApiError("Invalid email or password", httpStatus.BAD_REQUEST));
      }

      const token = generateAccessToken(user);

      successResponse(res, httpStatus.OK, token);
    } catch (error) {
      return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async profile(req, res, next) {
    try {
      const user = await userService.findById(req.userId);

      if (!user) {
        return next(new ApiError("User not found", httpStatus.NOT_FOUND));
      }

      successResponse(res, httpStatus.OK, user);
    } catch (error) {
      return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async list(req, res, next) {
    try {
      const { page = 1, limit = 10, role = ROLES.STUDENT } = req.query;
      const users = await userService.list(page, limit, { role });

      const filteredUsers = users.map((user) => {
        const { _id, firstName, lastName, email, profileImage, studentId, department } = user;
        return { _id, firstName, lastName, email, profileImage, studentId, department };
      });

      successResponse(res, httpStatus.OK, users);
    } catch (error) {
      return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }

  async updateProfileImage(req, res, next) {
    try {
      let fileName;

      if (req?.files?.profileImage) {
        const extension = path.extname(req.files.profileImage.name);
        fileName = `${req.userId}${Date.now()}${extension}`;
        const folderPath = path.join(__dirname, "../", "uploads/users", fileName);

        req.files.profileImage.mv(folderPath, function (err) {
          if (err) return next(new ApiError(err.message, httpStatus.INTERNAL_SERVER_ERROR));
        });

        const result = await cloudinary.uploader.upload(folderPath, {
          use_filename: true,
          folder: "samu-api/users",
        });

        fileName = result.secure_url;
      }

      await userService.update(req.userId, { profileImage: fileName });

      successResponse(res, httpStatus.OK, { message: "Image upload successfully" });
    } catch (error) {
      return next(new ApiError(error.message, httpStatus.BAD_REQUEST));
    }
  }
}

module.exports = new UserController();
