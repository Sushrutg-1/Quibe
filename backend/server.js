import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import postsRoutes from "./routes/post.route.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", postsRoutes);

const start = async () => {
  try {
    const connetDB = await mongoose.connect(MONGO_URI);
    console.log(`CONNECTED TO DB HOST : ${connetDB.connection.host}`);
  } catch (e) {
    (console, log(`ERROR WHILE CONNECTING TO DB ${e}`));
  }

  app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT} `);
  });
};

start();
