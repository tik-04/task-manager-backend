import db from "../config/db.js";

export const getTaskByUser = async (userId) => {
    try {
        const [task] = await db.promise().query(`
            SELECT * FROM users WHERE id = ?
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

    } catch(error){
        console.error("error:",error)
        throw error
    }
}