import db from "../config/db.js";

export const getTaskByUser = async (userId) => {
    try {
        const [task] = await db.promise().query(`
            SELECT * FROM tasks WHERE user_id = ?
            `, [userId]
        );
        return task
    } catch(error){
        console.error("Error",error)
        throw error
    }
} 

export const getTaskId = async (taskId) => {
    try {
        const [task] = await db.promise().query(`
            SELECT title,description,status FROM tasks WHERE id = ?
            `, [taskId])
            return task[0] || null;
    } catch(error){
        console.error("error:",error)
        throw error
    }
}

export const createTask = async (userId,title,description,status,due_date) => {
    try {
        const [result] = await db.promise().query(`
            INSERT INTO tasks (user_Id,title,description,status,due_date,created_at) VALUES (?,?,?,?,?,NOW())
            `, [userId,title,description,status,due_date])
            return { success: result.affectedRows > 0, message: "Task created successfully"}
    } catch(error){
        console.error("error:",error)
        throw error
    }
}

export const checkTask = async (taskId) => {
    const [checkTask] = await db.promise().query(`
    SELECT * FROM tasks where id = ?
    `,[taskId])
    return checkTask[0] || null;
    }

export const updateTask = async (taskId,status) => {
    try {
        const existingTask = await checkTask(taskId)
        if (!existingTask) {
            return { success: false, message: "Task not found" };
        }

        const [result] = await db.promise().query(`
            UPDATE tasks
            SET status = ?
            WHERE id = ?
            `, [status,taskId])
            return { success: result.affectedRows > 0, message: "Task update successfully"}
    } catch(error){
        console.error("error",error)
        throw error
    }
}

export const editTask = async (taskId,title,description,due_date) => {
    try {
        const existingTask = await checkTask(taskId)
        if (!existingTask) {
            return { success: false, message: "Task not found" };
        }

        const [result] = await db.promise().query(`
            UPDATE tasks
            SET title = ?,description = ?,due_date = ?
            WHERE id = ?
            `, [title,description,due_date,taskId])
            return { success: result.affectedRows > 0, message: "Task edit successfully"}
    } catch(error){
        console.error("error",error)
        throw error
    }
}

export const deleteTask = async (taskId) => {
    try{
        const existingTask = await checkTask(taskId)
        if (!existingTask) {
            return { success: false, message: "Task not found" };
        }

        const [result] = await db.promise().query(`
            DELETE FROM tasks WHERE id = ?
            `, [taskId])
        return { success: result.affectedRows > 0, message: "Delete Task successfully"}
    } catch(error){
        console.error("error",error)
        throw error
    }
}

