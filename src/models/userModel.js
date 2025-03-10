import db from "../config/db.js";

// ฟังก์ชันเช็คว่ามี User อยู่แล้วหรือไม่
export const getUserByEmail = async (email) => {
    try {
        const [user] = await db.promise().query(`
            SELECT * FROM users WHERE email = ?`,
            [email]
        );
        return [user].length > 0 ? user[0] : null; 
    } catch (error) {
        console.error("Error in getUserByEmail:", error);
        throw error;
    }
};

export const getUserById = async (userId) => {
    try {
        const [user] = await db.promise().query(`
            SELECT * FROM users WHERE id = ?`,
            [userId]
        );
        return [user].length > 0 ? user[0] : null; 
    } catch (error) {
        console.error("Error in getUserByEmail:", error);
        throw error;
    }
};

// ฟังก์ชันสร้าง User ใหม่ (ถ้ายังไม่มี Email นี้)
export const createUser = async (username, email, password) => {
    try {
        // เช็คว่า Email นี้มีอยู่หรือยัง
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return existingUser.id;
        }

        // ถ้าไม่มี ให้ INSERT User ใหม่
        const [result] = await db.promise().query(
            `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
            [username, email, password]
        );

        return result.insertId; // คืนค่า id ของ User ที่เพิ่มใหม่
    } catch (error) {
        console.error("Error in createUser:", error);
        throw error;
    }
};
