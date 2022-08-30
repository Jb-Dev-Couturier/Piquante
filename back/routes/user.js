import express from 'express'
import  {passwordCheck } from '../middleware/passwordCheck.js'
import  {emailCheck}  from '../middleware/emailCheck.js'

const router = express.Router()

router.get('/', async(req,res)=>{res.send("Auth Route")})

export default router