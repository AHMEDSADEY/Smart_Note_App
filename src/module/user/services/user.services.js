import User from "../../../DB/model/User/user.model.js";
import { successResponse } from "../../../utils/response/success.response.js"
import { genrateDecryption } from "../../../utils/security/Encryption/encryption.js"
import CryptoJS from "crypto-js";
import { compareHash, generataHash } from "../../../utils/security/hash/hash.js";
import Note from "../../../DB/model/Note/Note.model.js";
export const profile = async(req,res,next)=>{
      const findMessage = Note.find({ownerId:req.user._id}).populate({
            path:"receiverId",
            select:"-password -_id"
      })
      req.user.phone = genrateDecryption({cipherText:req.user.phone})
      return successResponse({res,message:"User Profile" , data:{user:req.user} })
}
export const shareProfile =async (req,res,next)=>{
      const user = await User.findOne({_id:req.params.userId , isDeleted:false}).select("userName email gender")
      console.log("user",req.params.userId);
      return user ? successResponse({res , data:{user}}) :next(new Error("In Valid account id",{cause:404} ))
}
export const updataProfile = async(req,res,next)=>{   
      const user = await User.findByIdAndUpdate(req.user._id , req.body ,{new:true , runValidators:true})
      return successResponse({res,message:"Update Successfully" , data:{user} })
}
export const updatePassword = async (req,res,next) => {
      const {newPassword , oldPassword} = req.body
      if(!compareHash({plainText:oldPassword , hashValue:req.user.password})){
            return next(new Error("In-valid old Password!",{cause:409}))
      }
      const hashPassword = generataHash({plainText:newPassword})
      const user = await User.findByIdAndUpdate(req.user._id , {password:hashPassword , changePassword:Date.now()},{new:true , runValidators:true})
      return successResponse({res,message:"Update Password Successfull"})
}
export const freezeProfile = async(req,res,next)=>{
      const user = await User.findByIdAndUpdate(req.user._id , {changePassword:Date.now(), isDeleted:true },{new:true , runValidators:true})
      return successResponse({res,message:"Freeze Profile !"})
}

export const uploadProfilePic = async (req, res, next) => {
  if (!req.file) {
    return next(new Error("No file uploaded", { cause: 400 }));
  }
  const filePath = `uploads/${req.file.filename}`;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { profilePic: filePath },       
    { new: true, runValidators: true }
  );
  return successResponse({
    res,
    message: "Profile picture updated successfully",
    data: { user }
  });
};