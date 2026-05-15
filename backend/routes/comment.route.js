import { Router } from "express";
import {
  deleteCommentOfUser,
  getAllCommentsByPost,
} from "../controllers/comment.controller.js";

const router = Router();

router.route("/get_comments").get(getAllCommentsByPost);
router.route("/delete_comment").delete(deleteCommentOfUser);

export default router;
