import { Router } from "express";
import * as noteService from "../Note/services/Note.services.js"
import { asyncHandler } from "../../utils/error/Error/error.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as noteValidor from "../Note/Note.validator.js"
import { authentication } from "../../middleware/auth.middleware.js";
const router = Router()
router.post("/notes",authentication,validation(noteValidor.Note),asyncHandler(noteService.CreateNote))
router.delete("/notes/:id" ,authentication,asyncHandler(noteService.DeleteNote))
export default router 