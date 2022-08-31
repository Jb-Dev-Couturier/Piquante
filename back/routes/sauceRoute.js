import express from 'express';
import { getAllSauces } from '../controllers/SauceController.js';
import { authCheck } from '../middleware/authCheck.js';

const router = express.Router();

router.get('/', authCheck, getAllSauces);

export default router;