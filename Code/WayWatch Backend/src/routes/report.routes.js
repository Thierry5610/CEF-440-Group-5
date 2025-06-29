// src/routes/report.routes.js

import { Router } from 'express';
import {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
} from '../controllers/report.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST - Create a report
router.post(
  '/',
  upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  createReport
);

// GET - All reports
router.get('/', getAllReports);

// GET - Single report by ID
router.get('/:id', getReportById);

// PUT - Update report by ID
router.put('/:id', authMiddleware, updateReport);

// DELETE - Delete report by ID
router.delete('/:id', authMiddleware, deleteReport);

export default router;
