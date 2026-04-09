const Joi = require("joi");

const email = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "ge"] } })
  .required()
  .messages({
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is a required field.",
  });

const password = Joi.string()
  .min(8)
  .max(30)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])"))
  .required()
  .messages({
    "string.min": "Password must be at least 8 characters long.",
    "string.pattern.base": "Password must contain uppercase, lowercase, number, and special character.",
    "any.required": "Password is required.",
  });

const loginFormValidationSchema = Joi.object({
  email,
  password,
});

const signupFormValidationSchema = Joi.object({
  email,
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "any.required": "Username is required.",
  }),
  password,
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.",
  }),
});

module.exports = { signupFormValidationSchema, loginFormValidationSchema };