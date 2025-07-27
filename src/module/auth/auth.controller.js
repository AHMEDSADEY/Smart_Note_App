import { Router } from "express";
import * as registerServices from "./Services/Register/register.services.js"
import * as logInServices from "./Services/login/login.services.js"
import * as logOutServices from "./Services/logout/logout.services.js"
import { asyncHandler } from "../../utils/error/Error/error.js";
import {validation} from "../../middleware/validation.middleware.js"
import * as registerValidator from "./Services/Register/register.services.js"
import * as logInValidation from "./Services/login/login.validation.js"
import * as logoutvalidator from "./Services/logout/logout.validation.js"
import { authentication } from "../../middleware/auth.middleware.js";

const router = Router() 

router.post("/register",validation(registerValidator.register), asyncHandler(registerServices.register))

router.post("/logIn",validation(logInValidation.login),asyncHandler(logInServices.logIn))
router.post("/logout",authentication,validation(logoutvalidator.logOut), asyncHandler(logOutServices.logOut))
router.post("/forget-password",authentication,validation(logInValidation.forgitPassword), asyncHandler(logInServices.forgetPassword))
router.post("/reset-password",authentication,validation(logInValidation.resetPassword), asyncHandler(logInServices.resetPassword))
export default router 