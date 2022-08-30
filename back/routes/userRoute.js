import express from 'express'
import  {passwordCheck } from '../middleware/passwordCheck.js'
import  {emailCheck}  from '../middleware/emailCheck.js'
import { registerUser } from '../controllers/UserController.js';

const router = express.Router()


router.post('/signup', emailCheck, passwordCheck, registerUser);

export default router