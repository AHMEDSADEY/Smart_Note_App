import jwt from "jsonwebtoken";
import User from "../DB/model/User/user.model.js";
import { verifyToken } from "../utils/security/Token/token.js";
import crypto from "crypto";
  
export const authentication = async (req, res, next) => {
    //Destructuring Authorization from Headers
    const { authorization } = req.headers;
  // Destructuring Bearer And Token Array from Authorization
    const [bearer, token] = authorization.split(" ") || [];
    if (!bearer || !token) {
          return next(new Error("Invalid Authorization format" , {cause:400}))
    }
    let signature;  
    if (bearer === "Admin") {
      signature = process.env.Admin_TokenSignature;
    } else if (bearer === "Bearer") {
      signature = process.env.TokenSignature;
    } else {
        return next(new Error("Unknown token type", {cause:400}))
    }
    if (!signature) {
      return next(new Error(" Missing token signature", {cause:400}))
    }
    const decoded = verifyToken({token})
    if (!decoded?.id) {
      return next(new Error( "Invalid token payload", {cause:400}))
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new Error("Not Registered Account", {cause:400}))
    }
    if(user.changePassword?.getTime()>=decoded.iat *1000){
    return next(new Error("In-valid Credentials!",{cause:400}))
  }
    req.user = user;
    next();
  } 
export const authorization =(accessRoles = [])=>{
    return async (req,res,next)=>{
      if(!accessRoles.includes(req.user.role)){
      return next(new Error("un authorized account !", {cause:403}))
      }
      return next()
    }
}
