// src/routes/report.routes.js

import { Router } from 'express';
import {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
} from '../controllers/report.controller.js';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// 🔓 REMOVE `protect` to make the route public
router.post(
  '/',
  upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  createReport
);

router.get('/', getAllReports);
router.get('/:id', getReportById);
router.put('/:id', updateReport); // still protected? Remove protection if needed
router.delete('/:id', deleteReport); // same here
