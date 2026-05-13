import mongoose from "mongoose";
import { UserSchema, UserSchemea } from "../Schema/user.schema.js";

const User = mongoose.model("User", UserSchema);
