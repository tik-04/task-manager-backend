import * as taskModel from '../models/taskModel.js'
import * as userModel from '../models/userModel.js'


export const getTaskByUser = async (req,res) => {
    const userId = req.params.id

    try {
        if (!userId) {
            return res.status(400).json({ success : false,message: "Missing user ID"})
        }

        const user = await userModel.getUserById(userId)

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found"})
        }
        
        const result = await taskModel.getTaskByUser(userId)

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: "Task not found"})
        }

        return res.json({ success: true, data: result})
    } catch (error) {
        res.status(500).json({ message: "Server Error",error:error})
    }
}

export const getTaskId = async (req,res) => {
    const  taskId = req.params.id;

    try{
        if (!taskId) {
            return res.status(404).json({ success : false,message: "Missing task ID"})
        }

        const result = await taskModel.getTaskId(taskId);

        if (!result) {
            return res.status(400).json({ success: false, message: "Task not found"})
        }

        return res.json({ success: true, data: result })
    } catch(error) {
      res.status(500).json({ message: "Server Error",error:error})
    }
}