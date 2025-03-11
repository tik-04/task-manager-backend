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
            return res.status(400).json({ success : false,message: "Missing task ID"})
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

export const createdTask = async (req,res) => {
    const userId = req.body.id
    const { title,description,status,due_date } = req.body

    if (!userId) {
        return res.status(400).json({ success : false,message: "Missing user ID"})
    }

    if (!title || !description || !status || !due_date) {
        return res.status(400).json({ success:false,message: "Missing required fields."})
    }


    try {
        const result = await taskModel.createTask(userId,title,description,status,due_date) 

        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message });
        }

        res.json({ success: true, message: result.message})
    } catch (error) {
        res.status(500).json({ message: "Server Error",error:error})
    }
}

export const updateTask = async (req,res) => {
    const  taskId = req.params.id;
    const { status } = req.body

    if (!taskId) {
        return res.status(400).json({ success : false,message: "Missing task ID"})
    }

    if (!status) {
        return res.status(400).json({ success:false,message: "Status is required"})
    }
    try {
        const result = await taskModel.updateTask(taskId,status)

        if (!result.success){
            return res.status(500).json({ success: false, message: result.message });
        }

        res.json({ success:true,message:result.message})
    } catch (error) {
        return res.status(500).json({message: "Server Error",error:error})
    }
}

export const editTask = async (req,res) => {
    const taskId = req.params.id
    const {title,description,due_date} = req.body

    if (!taskId) {
        res.status(400).json({ success:false,message:"Missing task ID"})
    }

    if (!title || !description || !due_date) {
        res.status(400).json({ success:false,message:"Missing Required field."})
    }
    try {
        const result = await taskModel.editTask(taskId,title,description,due_date)

        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message });
        }

        res.json({ success:true,message:result.message})
    } catch(error) {
        res.status(500).json({ message:"Internal Server Error",error:error})
    }
}

export const deleteTask = async (req,res) => {
    const taskId = req.params.id

    if (!taskId) {
        res.status(400).json({ success:false,message:"Missing task ID"})
    }
    try {
        const result = await taskModel.deleteTask(taskId)

        if (!result.success) {
            res.status(500).json({ success: false, message: result.message })
        }

        return res.json({ success:true,message:result.message})
    } catch(error) {
        res.status(500).json({message:"Internal Server Error",error:error})
    }
}