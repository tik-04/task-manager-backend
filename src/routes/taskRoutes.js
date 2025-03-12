import express from 'express'
import * as taskController from '../controllers/taskController.js'


const taskRoute = express.Router();

taskRoute.get('/tasks', taskController.getTaskByUser);
taskRoute.get('/tasks/:taskId', taskController.getTaskId);
taskRoute.post('/tasks', taskController.createdTask)
taskRoute.patch('/tasks/:taskId/status', taskController.updateTask)
taskRoute.patch('/tasks/:taskId', taskController.editTask)
taskRoute.delete('/tasks/:taskId', taskController.deleteTask)

export default taskRoute