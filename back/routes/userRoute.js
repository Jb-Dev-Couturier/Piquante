import express from 'express'
import  {passwordCheck } from '../middleware/passwordCheck.js'
import  {emailCheck}  from '../middleware/emailCheck.js'
import { login, registerUser } from '../controllers/UserController.js';

const router = express.Router()


router.post('/signup', emailCheck, passwordCheck, registerUser);
router.post('/login', login);

export default router