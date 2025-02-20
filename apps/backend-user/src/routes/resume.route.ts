import express from "express";
import { generateResumeContent } from "../controllers/resumeGenerate.controller";

const router = express.Router();

router.post('/create', generateResumeContent);

export default router