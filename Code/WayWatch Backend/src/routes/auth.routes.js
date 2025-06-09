import express from 'express';
import {
  register,
  login,
  resendOtp,
  verifyOtp,
  requestPasswordReset,
  resetPassword,
  logout,
  updateProfile
} from '../controllers/auth.controller.js';
import { verifyToken , isAuthenticated} from '../middlewares/auth.middleware.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/register', authLimiter, register);                 // /api/v1/auth/register
router.post('/login', authLimiter, login);                       // /api/v1/auth/login
router.post('/resend-otp', authLimiter, resendOtp);              // /api/v1/auth/resend-otp
router.post('/verify-otp', authLimiter, verifyOtp);              // /api/v1/auth/verify-otp (POST with email+otp in body)
router.get('/verify/:otp', verifyOtp);                           // /api/v1/auth/verify/:otp?email=email@example.com (GET for link)
router.post('/request-password-reset', authLimiter, requestPasswordReset);
router.post('/reset-password/:token', authLimiter, resetPassword);
router.post('/logout', verifyToken,logout);
router.put('/profile', isAuthenticated, updateProfile);

export default router;
