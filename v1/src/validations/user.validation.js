const Joi = require("joi");
const ROLES = require("../references/role.reference");

const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const stringPassswordError = new Error(
  "Password must be strong. At least one upper case alphabet." +
    " At least one lower case alphabet." +
    " At least one digit. At least one special character." +
    "Minimum eight in length"
);

const registerSchema = Joi.object().keys({
  firstName: Joi.string().required().min(3).max(50),
  lastName: Joi.string().required().min(3).max(50),
  email: Joi.string().required().email(),
  password: Joi.string().regex(RegExp(pattern)).error(stringPassswordError).required(),
  role: Joi.string().required().valid(ROLES.ADMIN,ROLES.GRADUATED,ROLES.STUDENT, ROLES.ACADEMICIAN),
  passwordConfirm: Joi.any().valid(Joi.ref("password")).required().label("Confirm password").messages({ "any.only": "{{#label}} does not match" }),
});

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});


module.exports = { registerSchema, loginSchema };
