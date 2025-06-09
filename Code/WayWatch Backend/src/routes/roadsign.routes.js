import express from 'express';
import multer from 'multer';
import {
  createRoadSign,
  getAllRoadSigns,
  getRoadSignById,
  updateRoadSign,
  deleteRoadSign,
  searchRoadSigns
} from '../controllers/roadsign.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


router.get('/search', searchRoadSigns);
router
  .route('/')
  .get(getAllRoadSigns)
  .post(authMiddleware, isAdmin, upload.single('image'), createRoadSign);

router
  .route('/:id')
  .get(getRoadSignById)
  .patch(authMiddleware, isAdmin, upload.single('image'), updateRoadSign)
  .delete(authMiddleware, isAdmin, deleteRoadSign);




export default router;
