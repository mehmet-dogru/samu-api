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
router.route("/all").get(authenticate, authorization([ROLES.ACADEMICIAN, ROLES.ADMIN]), complaintController.listAll);
router.route("/user").get(authenticate, authorization([ROLES.ACADEMICIAN, ROLES.ADMIN, ROLES.STUDENT]), complaintController.listComplaintByUserId);
router
  .route("/status/:id")
  .patch(
    authenticate,
    authorization([ROLES.ACADEMICIAN, ROLES.ADMIN]),
    validate(validationSchema.updateComplaintStatusSchema),
    complaintController.updateStatus
  );
router
  .route("/visibility/:id")
  .patch(
    authenticate,
    authorization([ROLES.ACADEMICIAN, ROLES.ADMIN]),
    validate(validationSchema.updateComplaintVisibilitySchema),
    complaintController.updateVisibility
  );

router.route("/:complaintId").delete(authenticate, authorization([ROLES.ACADEMICIAN, ROLES.ADMIN, ROLES.STUDENT]), complaintController.remove);

module.exports = router;
