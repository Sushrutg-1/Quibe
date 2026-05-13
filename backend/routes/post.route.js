import { Router } from "express";
import { activeCheck } from "../controllers/posts.controller.js";

const router = Router();

router.route("/new").get(activeCheck);

export default router;
