import express from 'express';
import { sendManualAlert } from '../controllers/alert.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/broadcast', verifyToken, sendManualAlert);

export default router;
