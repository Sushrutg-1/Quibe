import multer from "multer";
import { Router } from "express";
import {
  activeCheck,
  createPost,
  deletePost,
  getAllPosts,
} from "../controllers/posts.controller.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/create_post").post(upload.single("media"), createPost);
router.route("/posts").get(getAllPosts);
router.route("/delete_post").post(deletePost);


//Checking route
router.route("/").get(activeCheck);

export default router;
