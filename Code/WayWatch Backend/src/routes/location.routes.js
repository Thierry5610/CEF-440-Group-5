import express from 'express';
import { updateLocation } from '../controllers/location.controller.js';
import {authenticate} from '../middlewares/auth.middleware.js';

const router = express.Router();

// Protected route to update user location
router.post('/update', authenticate, updateLocation);

export default router;