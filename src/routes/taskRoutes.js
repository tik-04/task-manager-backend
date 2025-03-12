import express from 'express'
import * as taskController from '../controllers/taskController.js'
import { authMiddleware } from '../middleware/authMiddleware.js';


const taskRoute = express.Router();

taskRoute.get('/', authMiddleware, taskController.getTaskByUser);
taskRoute.get('/:taskId', authMiddleware, taskController.getTaskId);
taskRoute.post('/', authMiddleware, taskController.createdTask);
taskRoute.patch('/:taskId/status', authMiddleware, taskController.updateTask);
taskRoute.patch('/:taskId', authMiddleware, taskController.editTask);
taskRoute.delete('/:taskId', authMiddleware, taskController.deleteTask);


export default taskRoute