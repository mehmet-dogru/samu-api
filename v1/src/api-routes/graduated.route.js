const express = require("express");
const router = express.Router();

const graduatedController = require("../controllers/graduated.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/graduated.validation");
const authenticate = require("../middlewares/authenticate.middleware");
const authorization = require("../middlewares/authorization.middleware");

router
  .route("/create")
  .post(authenticate, authorization(["graduated"]), validate(validationSchema.createGraduatedSchema), graduatedController.create);
router.route("/").get(authenticate, graduatedController.list);

module.exports = router;
