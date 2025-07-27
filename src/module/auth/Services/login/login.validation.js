import joi from "joi";

export const login = { body:joi.object().keys({
    email:joi.string().email({minDomainSegments:1 , maxDomainSegments:3}).required(),
    password:joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)).required()
})}
export const forgitPassword = {body:joi.object().keys({
    email:joi.string().email({minDomainSegments:1 , maxDomainSegments:3}).required(),
    password:joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)).required()
})}
export const resetPassword ={body: joi.object().keys({
    email: joi.string().email().required(),
    otp: joi.string().length(6).required(),
    newPassword: joi.string().min(6).required()
})}