import express from 'express';
import { forgotPassword, getProfileData, login, logoutUser, resendVerificationLink, resetPassword, signupUser, updatePassword, updateProfile, verifyEmail } from '../controller/auth.js';
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/signup',signupUser);
router.post('/login',login);
router.post('/logout',logoutUser);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationLink);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);
router.get('/profile', protectRoute, getProfileData);
router.put('/update-password', protectRoute, updatePassword);
router.put('/update-profile', protectRoute, updateProfile);

export default router;