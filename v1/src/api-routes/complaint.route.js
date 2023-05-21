const express = require("express");
const router = express.Router();

const complaintController = require("../controllers/complaint.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/complaint.validation");
const authenticate = require("../middlewares/authenticate.middleware");
const authorization = require("../middlewares/authorization.middleware");

router.route("/").post(authenticate, validate(validationSchema.createComplaintSchema), complaintController.create);
router.route("/").get(authenticate, complaintController.list);
router.route("/update-status/:id").put(authenticate, validate(validationSchema.updateComplaintStatusSchema), complaintController.updateStatus);

module.exports = router;
