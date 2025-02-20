import express from "express";
import { deletejob, jobpost, showjobs } from "../controllers/jobpost.controller";

const router = express.Router();

router.post('/create', jobpost);
router.get('/showall', showjobs);
router.delete('/del', deletejob);


export default router