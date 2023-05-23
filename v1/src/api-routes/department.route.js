const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/department.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/department.validation");
const authenticate = require("../middlewares/authenticate.middleware");
const authorization = require("../middlewares/authorization.middleware");
const ROLES = require("../references/role.reference");

router.route("/").get(authenticate, departmentController.list);
router.route("/").post(authenticate, authorization([ROLES.ADMIN]), validate(validationSchema.departmentSchema), departmentController.create);
router
  .route("/:departmentId")
  .patch(authenticate, authorization([ROLES.ADMIN]), validate(validationSchema.departmentSchema), departmentController.update);

module.exports = router;
