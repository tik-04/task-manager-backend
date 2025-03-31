import * as taskModel from '../models/taskModel.js'
import * as userModel from '../models/userModel.js'


export const getTaskByUser = async (req,res) => {
    const userId = req.user.id

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
    const  taskId = req.params.taskId;

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

export const getTaskWeek = async (req, res) => {
    const userId = req.user.id;
    const { start, end } = req.query;
  
    console.log("🔥 GET /tasks/week");
    console.log("✅ userId:", userId);
    console.log("✅ start:", start);
    console.log("✅ end:", end);
  
    if (!start || !end) {
      console.log("❌ Missing start or end");
      return res.status(400).json({ success: false, message: "Missing Start or End" });
    }
  
    try {
      const result = await taskModel.getTaskWeek(userId, start, end);
      console.log("✅ RESULT:", result);
      res.json({ success: true, data: result });
    } catch (error) {
      console.error("💥 ERROR getTaskWeek:", error);
      res.status(500).json({ success: false, message: "Server Error", error });
    }
  };
  

export const createdTask = async (req,res) => {
    const userId = req.user.id
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

        return res.json({ success: true, message: result.message})
    } catch (error) {
        res.status(500).json({ message: "Server Error",error:error})
    }
}

export const updateTask = async (req,res) => {
    const  taskId = req.params.taskId;
    const { status } = req.body

    const taskExists = await taskModel.checkTask(taskId);
    if (!taskExists) {
        return res.status(404).json({ success: false, message: "Task not found" });
    }


    if (!status) {
        return res.status(400).json({ success:false,message: "Status is required"})
    }
    try {

        const invalidStatuses = ["pending", "completed"];
        if (invalidStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        const result = await taskModel.updateTask(taskId,status)

        if (!result.success){
            return res.status(400).json({ success: false, message: result.message });
        }

        return res.json({ success:true,message:result.message})
    } catch (error) {
        return res.status(500).json({message: "Server Error",error:error})
    }
}

export const editTask = async (req,res) => {
    const taskId = req.params.taskId
    const {title,description,due_date} = req.body

    if (!taskId) {
        return res.status(400).json({ success:false,message:"Missing task ID"})
    }

    if (!title || !description || !due_date) {
        return res.status(400).json({ success:false,message:"Missing Required field."})
    }
    try {
        const result = await taskModel.editTask(taskId,title,description,due_date)

        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message });
        }

        return res.json({ success:true,message:result.message})
    } catch(error) {
        return res.status(500).json({ message:"Internal Server Error",error:error})
    }
}

export const deleteTask = async (req,res) => {
    const taskId = req.params.taskId

    if (!taskId) {
        return res.status(400).json({ success:false,message:"Missing task ID"})
    }
    try {
        const result = await taskModel.deleteTask(taskId)

        if (!result.success) {
            return res.status(500).json({ success: false, message: result.message })
        }

        return res.json({ success:true,message:result.message})
    } catch(error) {
        return res.status(500).json({message:"Internal Server Error",error:error})
    }
}

export const historyTask = async (req,res) => {
    const userId = req.user.id

    try {
        if (!userId) {
            return res.status(400).json({ success : false,message: "Missing user ID"})
        }

        const user = await userModel.getUserById(userId)

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found"})
        }

        const history = await taskModel.historyTask(userId)

        if (history.length === 0) {
            return res.status(404).json({ success: false, message: "History Task not found"})
        }

        return res.json({ success: true, data: history})

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error",error:error})
    }
}