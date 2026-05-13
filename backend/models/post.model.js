import mongoose from "mongoose";
import { PostSchema } from "../Schema/post.schema.js";

const Post = mongoose.model("Post", PostSchema);

export default Post;
