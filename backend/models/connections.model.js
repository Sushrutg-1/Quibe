import mongoose from "mongoose";
import { ConnectionRequestSchema } from "../Schema/connections.schema.js";

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  ConnectionRequestSchema,
);

export default ConnectionRequest;
