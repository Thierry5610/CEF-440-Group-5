import { Router } from 'express';
import { createReport, getAllReports } from '../controllers/report.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() }); // for base64 or buffer upload

// Accept specific form fields
router.post(
  '/reports',
  authMiddleware,
  upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  createReport
);

router.get('/reports', authMiddleware, getAllReports);

export default router;
