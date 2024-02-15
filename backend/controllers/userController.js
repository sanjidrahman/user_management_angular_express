const db = require('../models/index.js')
const { User } = db.models
const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')

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
const userRegister = async (req, res) => {
    try {
        const { name, email, password, confirmpass } = req.body
        const existingUser = await User.findOne({ where: { email } })

        if (existingUser) {
            return res.json({ message: 'User already exists' })
        }

        if (password != confirmpass) {
            return res.json({ message: `Password and confirm password doesn't match` })
        }

        const spassword = await securepassword(password)

        const newUser = await User.create({
            name: name,
            email: email,
            password: spassword,
            isVerified: false
        })

        if (newUser) {
            const otp = otpGenerator.generate(4, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            sendVerifyMail(name, email, otp)
            res.status(201).json({ message: 'Success' })
        }
    } catch (err) {
        console.log(err.message);
    }
}


module.exports = {
    userRegister,
}