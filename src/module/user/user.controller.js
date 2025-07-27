import { Router } from "express";
import * as userServices from "./services/user.services.js";
import {
  authentication,
  authorization,
} from "../../middleware/auth.middleware.js";
import { endPoint } from "./user.endPoint.js";
import { asyncHandler } from "../../utils/error/Error/error.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as userValidator from "./user.validator.js"
import { uploadProfilePic as uploadProfilePicMulter } from "../../middleware/upload.middleware.js";
const router = Router();
router.patch(
  "/uplaod-profile-pic",
  authentication,
  uploadProfilePicMulter,
  asyncHandler(userServices.uploadProfilePic)
);
export default router;
