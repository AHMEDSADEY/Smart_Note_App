import mongoose from "mongoose";
        const connectDB = async ()=>{
    await mongoose.connect(process.env.DB_URI).then(()=>{
      console.log("DB Success Connection !");
    }).catch((err)=>{
      console.log("DB Faild Connection !" , err.message);
    })
}
export default connectDB