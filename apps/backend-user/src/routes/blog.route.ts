import express from "express";
import { createBlog, fetchAllBlog } from "../controllers/blog.controller";

const router = express.Router();

router.post("/create", createBlog);
router.get("/allpost", fetchAllBlog);

export default router