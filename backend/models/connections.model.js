import mongoose from "mongoose";
import { connectionRequest } from "../Schema/connections.schema.js";

const Connections = mongoose.model("Connections", connectionReques);
