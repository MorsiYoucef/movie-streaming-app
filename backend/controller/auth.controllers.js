import bcrypt from 'bcryptjs';
import crypto from 'crypto'
import dotenv from 'dotenv'
import { User } from '../models/User.js'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

dotenv.config()

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!email || !password || !username) {
            throw new Error("Please enter All fields")
        }

        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({ username, email, password: hashedPassword, verificationToken, verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 });
        await user.save();

        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            message: "User registered successfully..", user:
                { ...user._doc, password: undefined }
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}


export const login = async (req, res) => {

    const { email, password } = req.body;
    try {

        if (!email || !password) {
            throw new Error("Please enter email and password")
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date()
        await user.save()

        return res.status(200).json({
            sucess: true, message: "user Loged in successfully", user: {
                ...user._doc,
                password: undefined,
            },
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Login Failed', error: err.message });
    }

}
export const logout = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ success: true, message: 'User logged out successfully' });

}