const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validate.middleware");
const validationSchema = require("../validations/user.validation");
const authenticate = require("../middlewares/authenticate.middleware");
const authorization = require("../middlewares/authorization.middleware");

router.post("/register", validate(validationSchema.registerSchema), userController.register);
router.post("/login", validate(validationSchema.loginSchema), userController.login);
router.get("/profile", authenticate, userController.profile);

module.exports = router;
