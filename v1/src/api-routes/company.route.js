const express = require("express");
const router = express.Router();

const companyController = require("../controllers/company.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/company.validation");
const authenticate = require("../middlewares/authenticate.middleware");
const authorization = require("../middlewares/authorization.middleware");
const ROLES = require("../references/role.reference");

router.route("/").post(authenticate,authorization([ROLES.GRADUATED]), validate(validationSchema.createCompanySchema), companyController.create);
router.route("/:companyId").patch(authenticate,authorization([ROLES.GRADUATED]), validate(validationSchema.updateCompanySchema), companyController.update);

module.exports = router;
