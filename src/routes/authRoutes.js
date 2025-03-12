import express from 'express';
import * as authController from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post('/register', authController.registerUser);
authRoute.post('/login', authController.loginUser);

export default authRoute;
