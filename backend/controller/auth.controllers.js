import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
import { User } from '../models/User.js'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { SendOtpEmail, sendPasswordResetEmail } from '../mailtrap/sendEmail.js';
import crypto from 'crypto'

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

        SendOtpEmail(user.email, verificationToken, user.username);

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

export const verifyEmail = async (req, res) => {
    const { code } = req.body

    try {
        const user = await User.findOne({ verificationToken: code, verificationTokenExpiresAt: { $gt: Date.now() } })

        if (!user) {
            return res.status(400).json({ sucess: false, message: "Invalid or expired verification code" })
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined

        await user.save()

        res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
    } catch (error) {
        res.json({ success: false, message: error.message });

    }
}


export const forgetPassword = async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save()

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

        res.status(200).json({ success: true, message: "Password reset successful" });

    } catch (error) {
        // console.log("Error in resetPassword ", error);
        res.status(400).json({ success: false, message: error.message });

    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body

        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        // console.log("Error in resetPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }

}

export const authCheck = async (req, res) => {
    try {
		// console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}