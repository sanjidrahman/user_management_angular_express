const db = require('../models/index.js');
const { User } = db.models;
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
let OTP; // setting otp variable as global
let USER_EMAIL; //setting user_email as global

// To send mail with verification otp
const sendVerifyMail = async (name, email, otp) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.PASS
            },
        })

        const mailOptions = {
            from: process.env.MAIL,
            to: email,
            subject: 'For Email Verification',
            html: '<p> Hi ' + name + ' , please enter ' + otp + ' for your OTP verification'
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(otp + 'Email has been sent', info.response);
            }
        })

    } catch (err) {
        console.log(err.message);
    }
}

// secure password with bcrypt
const securepassword = async (password) => {
    try {

        const securepassword = await bcrypt.hash(password, 10)
        return securepassword

    } catch (err) {
        console.log(err.message);
    }
}

// user registration route
const userRegister = async (req, res, next) => {
    try {
        const { name, email, password, confirmPass } = req.body
        USER_EMAIL = email
        const existingUser = await User.findOne({ where: { email } })

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' })
        }

        if (password != confirmPass) {
            return res.status(404).json({ message: `Password and confirm password doesn't match` })
        }

        const spassword = await securepassword(password)

        const newUser = await User.create({
            name: name,
            email: email,
            password: spassword,
        })

        if (newUser) {
            OTP = otpGenerator.generate(4, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            sendVerifyMail(name, email, OTP)
            res.status(201).json({ message: 'Success' })
        }
    } catch (err) {
        next(err)
    }
}

// verify user otp 
const verifyOtp = async (req, res, next) => {
    try {
        const { otp } = req.body
        if (otp == OTP) {
            const existingUser = await User.findOne({ where: { email: USER_EMAIL } })
            await existingUser.update({ isVerified: true });
            const payload = { id: existingUser.id, role: 'user' };
            const token = jwt.sign({ payload }, 'usersecret')
            return res.status(200).json({ message: 'Success', token })
        } else {
            return res.status(401).json({ message: 'Incorrect OTP' })
        }
    } catch (err) {
        next(err)
    }
}

// user login route
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ where: { email } })

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found, Please register!' })
        }

        const encpass = await bcrypt.compare(password, existingUser.password)
        if (!encpass) {
            return res.status(401).json({ message: 'Email or Password incorrect' })
        }

        if (existingUser.isVerified) {
            const payload = { id: existingUser.id, role: 'user' };
            const token = jwt.sign({ payload }, 'usersecret')
            return res.status(200).json({ message: 'Success', token })
        } else {
            USER_EMAIL = email
            OTP = otpGenerator.generate(4, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            sendVerifyMail(existingUser.name, email, OTP)
            return res.status(302).json({ message: 'Redirect' })
        }
    } catch (err) {
        next(err)
    }
}

// get current logged user details
const getCurrUser = async (req, res, next) => {
    try {
        const id = req.body.userId
        const userData = await User.findOne({ where: { id } })
        return res.status(200).json({ userData })
    } catch (err) {
        next(err)
    }
}


module.exports = {
    userRegister,
    verifyOtp,
    userLogin,
    getCurrUser,
}