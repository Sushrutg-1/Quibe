import mongoose from "mongoose";
import { CommentSchema } from "../Schema/comment.schema.js";

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
