import User from "../../../../DB/model/User/user.model.js";
import { sendCode } from "../../../../utils/email/events/email.events.js";
import { sendEmail } from "../../../../utils/email/send.email.js";
import { successResponse } from "../../../../utils/response/success.response.js";
import { genrateDecryption } from "../../../../utils/security/Encryption/encryption.js";
import { compareHash } from "../../../../utils/security/hash/hash.js";
import { generataToken } from "../../../../utils/security/Token/token.js";

export const logIn = async (req, res, next) => {
    //Destructuring Email OR Password from Body
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    // Login Error Message 
    return next(new Error("Login Faild !", { cause: 409 }));
  }
  //Re-account
    if(user.isDeleted){
      user.isDeleted = false
      await user.save()
    }
  // Phone Number Decryption
  user.phone = genrateDecryption({ cipherText: user.phone });
  const token = generataToken({
    payload: { id: user._id, isLoggin: true },
    signature:
      user.role == "Admin"
        ? process.env.Admin_TokenSignature
        : process.env.TokenSignature,
  });
  
  if (!compareHash({ plainText: password, hashValue: user.password })) {
    return next(
      new Error("Password is Not Match , Please Enter The Correct Password !", {
        cause: 404,
      })
    );
  }

  // Response Message
  return successResponse({
    res,
    message: "Created Successfully",
    data: { token },
  });
};
export const forgetPassword = async(req,res,next)=>{
    const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Store OTP and expiry (e.g., 10 min) in user document
    user.resetOTP = otp;
    user.resetOTPExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    // Send OTP via email
    await sendCode({
      to: user.email,
      subject: "Your Password Reset OTP",
      text: `Your OTP is: ${otp}`
    });
  }
  // Always respond the same way
  return res.json({
    message: "If this email is registered, you will receive an OTP shortly."
  });
}
export const resetPassword = async(req,res,next)=>{
 const { email, code, password } = req.body;
  const user = await User.findOne({ email, isDeleted: true });
  if (!user) {
    return next(new Error("In-valid Account ", { cause: 404 }));
  }
  if (!user.confirmEmail) {
    return next(new Error("Verify Your Account First !", { cause: 404 }));
  }
  if (compareHash({ plainText: code, hashValue: user.resetPasswordOTP })) {
    return next(new Error("in-valid Reset Code !", { cause: 400 }));
  }
  await dbServices.updateOne({
    model: User,
    filter: { email },
    data: { password: genrateHash({ plainText: password }) },
    changeCridentialTime: Date.now(),
    $unset: {
      resetPasswordOTP: 0,
    },
  });
  await User.updateOne({email  },{password: genrateHash({ plainText: password })} , { changeCridentialTime: Date.now()})
  return successResponse({ res, message: "Success Reset Password !" });
}