import mongoose from "mongoose";

export const connectionRequest = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  connectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  status_accepted: {
    type: Boolean,
    default: null,
  },
});
