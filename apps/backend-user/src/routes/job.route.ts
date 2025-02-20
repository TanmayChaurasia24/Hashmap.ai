import express from "express";
import { fetchAllJobs } from "../controllers/jobs.controller";

const router = express.Router();

router.get("/bulk", fetchAllJobs)

export default router