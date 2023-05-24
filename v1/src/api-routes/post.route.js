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

router.route("/").get(authenticate, authorization([ROLES.ACADEMICIAN, ROLES.STUDENT]), postController.list);
router.route("/all").get(authenticate, authorization([ROLES.ADMIN]), postController.listAll);

module.exports = router;
