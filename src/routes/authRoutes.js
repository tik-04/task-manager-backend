import express from 'express';
import * as authController from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const authRoute = express.Router();

authRoute.post('/register', authController.registerUser);
authRoute.post('/login', authController.loginUser);
authRoute.post('/logout', authController.logoutUser)
authRoute.get("/me", authMiddleware, authController.getAuthUser);

export default authRoute;
