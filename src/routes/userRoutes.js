import express from 'express';
import * as userController from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js';

const userRoute = express.Router();

userRoute.get('/', authMiddleware, userController.getUserById)

export default userRoute;
