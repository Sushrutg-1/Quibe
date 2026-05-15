import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import postsRoutes from "./routes/post.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

app.use(postsRoutes);
app.use(userRoutes);

const start = async () => {
  try {
    const connetDB = await mongoose.connect(MONGO_URI);
    console.log(`CONNECTED TO DB HOST : ${connetDB.connection.host}`);
  } catch (error) {
    console.log(`ERROR WHILE CONNECTING TO DB ${error.message}`);
  }

  app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT} `);
  });
};

start();
