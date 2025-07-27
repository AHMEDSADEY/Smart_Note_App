
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { emailEvents } from "../../../../utils/email/events/email.events.js";
import { successResponse } from "../../../../utils/response/success.response.js";
import {
  compareHash,
  generataHash,
} from "../../../../utils/security/hash/hash.js";
import {
  genrateDecryption,
  genrateEncryption,
} from "../../../../utils/security/Encryption/encryption.js";
import {
  generataToken,
  verifyToken,
} from "../../../../utils/security/Token/token.js";
import User from "../../../../DB/model/User/user.model.js";

export const register = async (req, res, next) => {
  const { userName, email, password, confirmationPassword } = req.body;
  if (password !== confirmationPassword) {
    return next(
      new Error("Password Not Equal confirmationPassword ", { cause: 400 })
    );
  }
  if (await User.findOne({ email })) {
    // return res.status(409).json({message:"Email is Already Exists !"})
    return next(new Error("Email is Already Exists !", { cause: 409 }));
  }
  const passwordHash = generataHash({ plainText: password });
  // Phone Number Encryption
  // const phoneEncryption = genrateEncryption({ plainText: phone });
  const user = await User.create({
    userName,
    email,
    password: passwordHash,
  });
  emailEvents.emit("confirmationEmail", { email });
  // Response Message
  return successResponse({
    res,
    message: "Created Successfully",
    data: { user },
  });
};
export const confrmEmail = async (req, res, next) => {
  const { authorization } = req.headers;
  const decodedToken = verifyToken({ token: authorization }); //
  console.log("VERIFY secret:", process.env.Email_Token);
  console.log("Authorization:", authorization);
  const user = await User.findOneAndUpdate(
    { email: decodedToken.email },
    { confirmEmail: true },
    { new: true }
  );
  // Response Message
  return successResponse({
    res,
    message: "Created Successfully",
    data: { user },
  });
};
