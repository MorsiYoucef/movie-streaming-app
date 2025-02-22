// import nodemailer from 'nodemailer';
import { ENV_VARS } from '../config/envVars.js';
import transporter from '../config/nodemailer.js';
import {PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE,} from './emailTemplate.js'

export const SendOtpEmail = async (recipientEmail, otpCode,name) => {
    const mailOptions = {
        from: {
            name: 'Yusuf Morsi',
            address: ENV_VARS.SMPT_USER
        },
        to: recipientEmail,
        subject: 'Verify your email',
        text: `Hello ${name}, welcome to our app!`, // Plain text version
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", otpCode)
    };

    try {
        // console.log('Attempting to send email...');
        const info = await transporter.sendMail(mailOptions);
        // console.log('Email sent successfully:', info);
    } catch (emailError) {
        console.error('Error sending email:', emailError);
        // We'll still continue with the registration even if email fails
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	// const recipient = [{ email }];
    const mailOptions = {
        from: {
            name: 'Yusuf Morsi',
            address: ENV_VARS.SMPT_USER
        },
        to: email,
        subject: "Reset your password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        category: "Password Reset",
    };

    try {
        // console.log('Attempting to send email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info);
    } catch (emailError) {
        // console.error('Error sending email:', emailError.message);
        // We'll still continue with the registration even if email fails
    }

};
