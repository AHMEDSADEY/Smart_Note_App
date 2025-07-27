import joi from "joi";
import { genralFields } from "../../../../middleware/validation.middleware.js";

export const register = {
  body:joi.object().keys({
    userName:genralFields.userName.required(),
    email:genralFields.email.required(),
    password:genralFields.password.required(),
    confirmationPassword:genralFields.confirmationPassword.required(),
}).required().options({allowUnknown:false}),
}