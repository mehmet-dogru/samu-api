const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validate.middleware");
const validateUserCreateByRole = require("../middlewares/validate-user-create-by-role.middleware");
const validationSchema = require("../validations/user.validation");
const authenticate = require("../middlewares/authenticate.middleware");
const authorization = require("../middlewares/authorization.middleware");

router.post("/register", validateUserCreateByRole(), userController.register);
router.post("/login", validate(validationSchema.loginSchema), userController.login);
router.get("/profile", authenticate, userController.profile);
router.get("/", authenticate, userController.list);
router.post("/update-profile-image", authenticate, userController.updateProfileImage);
module.exports = router;
