import express from "express";
import { addUserInfor, allUsers, signup, updateUserInfo } from "../controllers/user.controller";
import { login } from "../controllers/user.controller";
import { extractUserInformationn } from "../controllers/user.controller";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/info', extractUserInformationn);
router.get('/all', allUsers);
router.put('/single', updateUserInfo);
router.post('/add', addUserInfor);

export default router;