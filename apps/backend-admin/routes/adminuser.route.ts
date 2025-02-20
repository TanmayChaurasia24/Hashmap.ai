import express from "express";
import { allUsers, createAdmin, login } from "../controllers/adminuser.controller";

const router = express.Router();

router.post('/create/yytsjsskuesmxw', createAdmin);
router.post('/login', login);
router.get('/showall', allUsers)


export default router