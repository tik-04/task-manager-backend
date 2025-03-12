import * as userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'

export const registerUser = async (req,res) => {

    const { username,email,password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required."})
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return existingUser.id;
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userId = await userModel.createUser(username, email, hashedPassword)

        return res.status(201).json({ success: true, message: "User registered successfully.", userId})
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
}

