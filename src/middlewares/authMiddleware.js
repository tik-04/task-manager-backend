import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

export const authMiddleware = async (req,res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({success:false,message:"Missing auth token"})
    }

    try {
        const token = authHeader.split(" ")[1]; // ดึง Token ออกจาก "Bearer JWT_TOKEN"
        const checkToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!checkToken) {
            return res.status(401).json({success:false,message:"Wrong authorized"})
        }

        req.user = { id: checkToken.id };
        next();
    } catch(error) {
        return res.status(500).json({ success: false, message: "Server error." });
    }
}