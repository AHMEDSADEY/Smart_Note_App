import joi from "joi";
import { genralFields } from "../../middleware/validation.middleware.js";

export const Note = {
  body:joi.object().keys({
    title:joi.string().min(6).max(30).required(),
    content:joi.string().min(6).max(60000).required(),
    ownerId:genralFields.id.required()
  }).required()
  }