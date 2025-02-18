import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js"

export const generateTokenAndSetCookie = (res, userId) =>{
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {
        expiresIn: "7d",
    })
    res.cookie("token", token, {
        httpOnly: true,
        secure: ENV_VARS.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return token
}