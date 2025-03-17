import * as userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';



dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET   

export const registerUser = async (req,res) => {

    const { username,email,password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required."})
    }

    try {
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use." });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userId = await userModel.createUser(username, email, hashedPassword)

        return res.status(201).json({ success: true, message: "User registered successfully.", userId})
    } catch (error) {
        console.error("Error in registerUser:", error);
        return res.status(500).json({ success: false, message: "Server error." });
    }
}

export const loginUser = async (req,res) => {
    const { email,password } = req.body

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required."})
    }

    try {
        const existingUser = await userModel.getUserByEmail(email);
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const checkPassword = await bcrypt.compare(password, existingUser.password)
        if (!checkPassword) {
            return res.status(400).json({ success: false, message: "Invalid email or password"})
        }

        const payload = { id: existingUser.id,email:existingUser.email}
        const options = { expiresIn: '1d' }
        const token = jwt.sign(payload, JWT_SECRET, options)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 วัน
        });
        
        return res.json({ success: true, message: "Login success!" });
        

    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(500).json({ success: false, message: "Server error." });
    }

}

export const logoutUser = (req, res) => {
    res.clearCookie("token");
    return res.json({ success: true, message: "Logged out successfully" });
};


export const getAuthUser = (req, res) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  
    res.json({ success: true, user: req.user });
  };
  