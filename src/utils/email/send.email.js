  import nodemailer from "nodemailer";
export const sendEmail = async({to="" , cc="" , bcc="", subject="Route_App" , text="" , html="" ,attachments= []})=>{
const transporter = nodemailer.createTransport({
  service:"gmail",
   // true for 465, false for other ports
  auth: {
    user: process.env.Email,
    pass: process.env.Email_PASS,
  },
    tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});
// Wrap in an async IIFE so we can use await.
  const info = await transporter.sendMail({
    from: `"Route Acadmy" <${process.env.Email}>`,
    to,
    cc,
    bcc,
    text,
    html,
    subject,
    attachments,
  });
  console.log("Message sent:", info.messageId);
    return info;
}