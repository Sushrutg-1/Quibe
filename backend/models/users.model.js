import mongoose from "mongoose";
import { UserSchema } from "../Schema/user.schema.js";

const User = mongoose.model("User", UserSchema);

export default User;
