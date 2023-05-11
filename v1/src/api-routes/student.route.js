const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/student.validation");
const authenticate = require("../middlewares/authenticate.middleware");
const authorization = require("../middlewares/authorization.middleware");

router.route("/create").post(authenticate, authorization(["admin"]), validate(validationSchema.createStudentSchema), studentController.create);
router.route("/").get(authenticate, studentController.list);

module.exports = router;
