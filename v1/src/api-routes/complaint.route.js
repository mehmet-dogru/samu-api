const express = require("express");
const router = express.Router();

const complaintController = require("../controllers/complaint.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/complaint.validation");
const authenticate = require("../middlewares/authenticate.middleware");
const authorization = require("../middlewares/authorization.middleware");
const ROLES = require("../references/role.reference");

router.route("/").post(authenticate, validate(validationSchema.createComplaintSchema), complaintController.create);
router.route("/").get(authenticate, complaintController.list);
router.route("/list-all").get(authenticate, authorization([ROLES.ACADEMICIAN, ROLES.ADMIN]), complaintController.listAll);
router.route("/update-status/:id").put(authenticate, validate(validationSchema.updateComplaintStatusSchema), complaintController.updateStatus);
router
  .route("/update-visibility/:id")
  .put(
    authenticate,
    authorization([ROLES.ACADEMICIAN, ROLES.ADMIN]),
    validate(validationSchema.updateComplaintVisibilitySchema),
    complaintController.updateVisibility
  );

module.exports = router;
