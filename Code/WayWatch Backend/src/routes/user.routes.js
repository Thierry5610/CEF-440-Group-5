import express from 'express';
import {
  getAllUsers,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';

const router = express.Router();

router.get('/', isAuthenticated, isAdmin, getAllUsers);
router.patch('/:id', isAuthenticated,  updateUser);
router.delete('/:id', isAuthenticated, isAdmin, deleteUser);

export default router;
