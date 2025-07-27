import joi from "joi";
import { Types } from "mongoose";
export const validateObjectId = (value , helper)=>{
  return Types.ObjectId.isValid(value) ? true :helper.message("In-valid objectId")

}
export const genralFields = {
    userName:joi.string().min(3).max(10).trim(),
      email:joi.string().email({minDomainSegments:1 , maxDomainSegments:3}),
      password:joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)),
      gender:joi.string(),
      confirmationPassword:joi.string().valid(joi.ref("password")),
      phone:joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}/)).messages({
        'any.required':"Phone IS REQUIRED"
      }),
      id:joi.string().custom(validateObjectId)
    }



export const validation = (schema) => {
  return (req, res, next) => {
    const validationErrors = [];
    const inputValidaion = ["body","params","query"]
    for (const key of inputValidaion) {
      if (schema[key]) {
        const result = schema[key].validate(req[key], { abortEarly: false });
        if (result.error) {
          validationErrors.push({
            key,
            errors: result.error.details.map((err) => err.message),
          });
        }
      }
    }

    if (validationErrors.length > 0) {
      // Validation Response Error Message 
      return res.status(400).json({
        message: "Validation Error",
        validationErrors,
      });
    }
    return next();
  };
};