import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

export const authMiddleware = async (req,res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Missing auth token" });
    }

    try {
        const checkToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!checkToken) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        req.user = { id: checkToken.id };
        next();
    } catch(error) {
        return res.status(500).json({ success: false, message: "Server error." });
    }
}