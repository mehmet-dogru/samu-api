const express = require("express");
const router = express.Router();

const companyController = require("../controllers/company.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/company.validation");
const authenticate = require("../middlewares/authenticate.middleware");
const authorization = require("../middlewares/authorization.middleware");

//router.route("/create").post(authenticate, authorization("graduated"), companyController.create);
router.route("/create").post(authenticate, validate(validationSchema.createCompanySchema), companyController.create);
router.route("/").get(authenticate, companyController.list);

module.exports = router;
