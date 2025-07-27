import joi from "joi";
import { genralFields } from "../../../../middleware/validation.middleware.js";

export const logOut = {
  body:joi.object().keys({
    email:genralFields.email.required(),
    password:genralFields.password.required()
  })
}