import express from "express";
import { deletejob, showjobs } from "../controllers/jobpost.controller";

const router = express.Router();

router.get('/showall', showjobs);
router.delete('/del', deletejob);


export default router