import { EventEmitter } from "node:events";
import { customAlphabet } from "nanoid";
import { generataHash } from "../../security/hash/hash.js";
import User from "../../../DB/model/User/user.model.js";
import { sendEmail } from "../../email/send.email.js"
import {verifyAccountTemplate} from "../../email/template/email.template.js"
export const emailEvents = new EventEmitter()
  export const emailSubject ={
    confirmEmail:"ConfirmEmail",
    resetPassord:"Reset-Password"
  }
  export const sendCode =async ({data={} , subject= emailSubject.confirmEmail} = {})=>{
      const {id , email} = data
  const otp = customAlphabet("12343afdsgre75saQbsv",6)();
  const hashOtp = generataHash({plainText:otp})
  let updateData ={}
  if(subject === emailSubject.confirmEmail){
    updateData = {confirmEmailOTP:hashOtp}
  }else if(subject === emailSubject.resetPassord){
    updateData = {resetPasswordOTP:hashOtp}
  } 
  // await User.updateOne({_id:id} ,{updateData})
  await User.updateOne({model:User , filter:{_id:id} ,data:{updateData}})
  const html = verifyAccountTemplate({code:otp})

  sendEmail({to:email , subject:"confirm-email" , html})
  }
emailEvents.on("sendConfirmEmail",async(data)=>{
    return sendCode({data})
})
emailEvents.on("forgotPassword",async(data)=>{
  return sendCode({data , subject:emailSubject.resetPassord})
})