const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/post.validation");
const authenticate = require("../middlewares/authenticate.middleware");
const authorization = require("../middlewares/authorization.middleware");
const ROLES = require("../references/role.reference");

router
  .route("/")
  .post(authenticate, authorization([ROLES.ACADEMICIAN, ROLES.ADMIN]), validate(validationSchema.createPostSchema), postController.create);

router.route("/").get(authenticate, postController.list);

router.route("/create-comment/:postId").post(authenticate, validate(validationSchema.commentValidation), postController.createComment);

module.exports = router;
