import express from 'express';
import { createSauces, getAllSauces, getSauce } from '../controllers/SauceController.js';
import { authCheck } from '../middleware/authCheck.js';
import multer from '../middleware/multer.js';
import sauceInputCheck from '../middleware/sauceInputCheck.js';

const router = express.Router();

router.get('/',  authCheck, getAllSauces);
router.post('/', authCheck,multer,sauceInputCheck, createSauces);
router.get('/:id', authCheck,getSauce);

export default router;