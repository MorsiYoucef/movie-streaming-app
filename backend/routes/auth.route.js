import express from 'express'
import { signup, login, logout, verifyEmail, forgetPassword, resetPassword,authCheck,resendOtp } from '../controller/auth.controllers.js';
import { protectRoute } from '../middleware/protectRoute.js';


const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-email', verifyEmail)
router.post("/forgot-password", forgetPassword)
router.post('/reset-password/:token', resetPassword)
router.get("/authCheck", protectRoute, authCheck)
router.post("/resend-otp", protectRoute, authCheck)



export default router