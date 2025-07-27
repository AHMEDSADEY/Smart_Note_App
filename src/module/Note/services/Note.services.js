import Note from "../../../DB/model/Note/Note.model.js";
import User from "../../../DB/model/User/user.model.js";
import { successResponse } from "../../../utils/response/success.response.js";

export const CreateNote= async(req,res,next)=>{
  const {title , content , ownerId} = req.body
  if(!User.findOne({_id:ownerId , isDeleted:false})){
    return new Error(`Not Found Messages `,{cause:404})
  }
  const createNote = await Note.create({title , content ,ownerId})
  // sendMessage Response createNote
  return successResponse({res , status:201 ,message:"Create Note Successfully ",data:{createNote} })
}
export const DeleteNote= async(req,res,next)=>{
  const noteId = req.params.id;
  const userId = req.user._id;
    await Note.findOne({ _id: noteId, userId });
  await Note.deleteOne({ _id: noteId });
  return res.json({ message: "Note deleted successfully" });
}