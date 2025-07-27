import joi from "joi";
import { genralFields } from "../../middleware/validation.middleware.js";

export const updataProfile = {
  body:joi.object().keys({
    userName:genralFields.userName,
    gender:genralFields.gender,
    DOB:joi.date().less("now")
})}
export const shareProfile = {
  params:joi.object().keys({
  userId:genralFields.id.required()
}).required(),
}
export const updataPassword = {
  body:joi.object().keys({
    oldPassword:genralFields.password.required(),
    newPassword:genralFields.password.not(joi.ref("oldPassword")).required(),
    confirmationPassword:genralFields.confirmationPassword.valid(joi.ref("newPassword ")).required()
}).required(),
}