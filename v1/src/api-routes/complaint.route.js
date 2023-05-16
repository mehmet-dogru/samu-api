const express = require("express");
const router = express.Router();

const complaintController = require("../controllers/complaint.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/complaint.validation");
const authenticate = require("../middlewares/authenticate.middleware");
const authorization = require("../middlewares/authorization.middleware");

router.route("/create").post(authenticate, validate(validationSchema.createComplaintSchema), complaintController.create);
router.route("/").get(authenticate, complaintController.list);

module.exports = router;
