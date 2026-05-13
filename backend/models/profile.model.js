import mongoose from "mongoose";
import { ProfileSchema } from "../Schema/profile.schema.js";

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
