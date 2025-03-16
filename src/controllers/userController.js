import * as userModel from '../models/userModel.js'

export const getUserById = async (req,res) => {
    const userId = req.user.id
    try {
        if (!userId) {
            return res.status(400).json({ success : false,message: "Missing user ID"})
        }

        const user = await userModel.getUserById(userId)

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found"})
        }

        return res.json({ success: true, user: user})
        } catch (error) {
            res.status(500).json({ message: "Server Error",error:error})
        }
}