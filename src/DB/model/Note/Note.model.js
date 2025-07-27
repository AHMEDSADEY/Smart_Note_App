
import { model, Schema, Types } from "mongoose";
// Note Schema 
  const noteSchema = new Schema({
    title:{type:String , required:true ,minlength:4 , maxlength:30 ,trim:true },
    content:{type:String , required:true , minlength:4 , maxlength:60000 ,trim:true},
    ownerId:{type:Types.ObjectId , ref:"User" , required:true},
    isDeleted:{type:Boolean , default:true}
  },{timestamps:true})
// Note Model 
  const Note = model("Notes" , noteSchema)
  export default Note
