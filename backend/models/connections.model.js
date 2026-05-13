import mongoose from "mongoose";
import { ConnectionRequest } from "../Schema/connections.schema.js";

const ConnectionRequest = mongoose.model("ConnectionRequest", ConnectionRequest);
