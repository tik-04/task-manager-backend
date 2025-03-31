import db from "../config/db.js";

export const getTaskByUser = async (userId) => {
    try {
        const [task] = await db.promise().query(`
            SELECT id, title, description, status, due_date, created_at 
            FROM tasks 
            WHERE user_id = ?
            AND status not in ('completed')
            `, [userId]
        );

        if (task.length === 0) {
            return null; // ✅ Return null ถ้าไม่เจอ
        }

        return task; 
    } catch(error){
        console.error("Error",error)
        throw error
    }
} 

export const getTaskId = async (taskId) => {
    try {
        const [task] = await db.promise().query(`
            SELECT title, description, status FROM tasks WHERE id = ?
        `, [taskId]);

        if (task.length === 0) {
            return null; // ✅ Return null ถ้าไม่เจอ
        }

        return task[0]; // ✅ ถ้าเจอให้ return ข้อมูล task
    } catch (error) {
        console.error("Error getting task:", error);
        throw error;
    }
};

export const getTaskWeek = async (userId,start,end) => {
    try {
        const [task] = await db.promise().query(`
            SELECT
            DATE(due_date) AS day,
            COUNT(*) AS total,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS done
            FROM tasks
            WHERE user_id = ?
            AND due_date BETWEEN ? AND ?
            GROUP BY DATE(due_date);
            `, [userId,start,end]);
        
            return task.map(row => ({
                day: row.day,
                percent: row.total === 0 ? 0 : Math.round((row.done / row.total) * 100)
             }));
        
    } catch(error) {
        console.error("Error",error)
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
    try {
        const [checkTask] = await db.promise().query(`
            SELECT id FROM tasks WHERE id = ?
        `, [taskId]);

        return checkTask.length > 0; // ✅ ถ้ามี task return true ถ้าไม่มี return null
    } catch (error) {
        console.error("Error checking task:", error);
        throw error;
    }
};


export const updateTask = async (taskId) => {
    try {
        const existingTask = await checkTask(taskId);
        if (!existingTask) {
            return { success: false, message: "Task not found" };
        }

        const [result] = await db.promise().query(`
            UPDATE tasks SET status = 'completed' WHERE id = ?
        `, [taskId]);

        if (result.affectedRows === 0) {
            return { success: false, message: "Task update failed" }; // ✅ ถ้าไม่มีแถวถูกอัปเดต
        }

        return { success: true, message: "Task updated successfully" }; // ✅ สำเร็จ
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};


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
    try {
        const existingTask = await checkTask(taskId);
        if (!existingTask) {
            return { success: false, message: "Task not found" };
        }

        const [result] = await db.promise().query(`
            DELETE FROM tasks WHERE id = ?
        `, [taskId]);

        if (result.affectedRows === 0) {
            return { success: false, message: "Task delete failed" }; // ✅ ถ้าลบไม่ได้
        }

        return { success: true, message: "Task deleted successfully" }; // ✅ ลบสำเร็จ
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};

export const historyTask = async (userId) => {
    try {
        const [task] = await db.promise().query(`
            SELECT id, title, description, status, due_date, created_at 
            FROM tasks 
            WHERE user_id = ?
            `, [userId]
        );

        if (task.length === 0) {
            return null; // ✅ Return null ถ้าไม่เจอ
        }
        
        return task; 
    } catch (error) {
        console.error("Error fetching History Task:", error);
        throw error;
    }
}

