const express = require("express");
const router = express.Router();
const { validateInput } = require("../middleware/validateInput");
const { signupFormValidationSchema, loginFormValidationSchema } = require("../utils/formValidationSchema");
const { register, verifyToken, login} = require("../controllers/authController");
const { getUser } = require("../controllers/userController");

router.post("/register", validateInput(signupFormValidationSchema), register);

router.post("/login", validateInput(loginFormValidationSchema), login);

router.get("/verify", verifyToken);

router.get("/user/:id", getUser);

module.exports = router;