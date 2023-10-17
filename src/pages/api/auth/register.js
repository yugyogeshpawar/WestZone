import User from 'src/server/models/user.model'
import OtpVerification from 'src/server/models/otpVerification.model'
import bcrypt from 'bcryptjs'
import dbConnect from 'src/server/utils/dbConnect'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

export default async (req, res) => {
  await dbConnect()

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' })
  }

  const { username, password, mobileNumber, email, sponsorId } = req.body

  // Validate username
  if (!username || username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    return res.status(400).json({ message: 'Invalid username' })
  }

  const existingUser = await User.findOne({ email })

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' })
  }

  let savedUser
  let sponsorName = 'westzone' // Default value

  try {
    if (sponsorId) {
      const sponsor = await User.findOne({ username: sponsorId })
      if (sponsor) {
        sponsorName = sponsor.username
      } else {
        sponsorName = null
      }
    }

    if (existingUser) {
      if (!existingUser.status) {
        return res.status(400).json({ message: 'Email already verified' })
      }

      // Update existing user details
      existingUser.username = username
      existingUser.password = await bcrypt.hash(password, await bcrypt.genSalt(10))
      existingUser.mobileNumber = mobileNumber
      existingUser.sponsorId = sponsorId
      existingUser.sponsorName = sponsorName

      savedUser = await existingUser.save()
    } else {
      const userExists = await User.findOne({ $or: [{ username }, { mobileNumber }] })

      if (userExists) {
        return res.status(400).json({ message: 'Username or mobile number already taken' })
      }

      // Validate password
      if (!password || password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' })
      }

      // Validate mobileNumber
      if (!mobileNumber || !/^[\d]{10,15}$/.test(mobileNumber)) {
        return res.status(400).json({ message: 'Invalid mobile number' })
      }

      const newUser = new User({
        username,
        password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
        mobileNumber,
        email,
        sponsorId,
        sponsorName
      })

      savedUser = await newUser.save()
    }

    const verificationToken = crypto.randomBytes(20).toString('hex')
    const otp = Math.floor(100000 + Math.random() * 900000) // Generate a 6-digit OTP
    const otpExpires = new Date(Date.now() + 3600000) // OTP expires in 1 hour

    const otpVerification = new OtpVerification({
      userId: savedUser._id,
      otp,
      verificationToken,
      expires: otpExpires
    })

    await otpVerification.save()

    const verificationUrl = `${req.headers.origin}/auth/verify-email?token=${verificationToken}`

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    })

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Westzone Verify Your Email',
      text:
        'Thank you for registering!\n\n' +
        'Please verify your email by clicking on the following link, or pasting this into your browser within one hour of receiving it:\n\n' +
        ` ${verificationUrl}\n\n` +
        `Or you can enter the following OTP in the app: ${otp}\n\n` +
        'If you did not request this, please ignore this email.\n'
    }

    transporter.sendMail(mailOptions, (err, _) => {
      if (err) {
        console.log('ERROR: Unable to send email', err)

        return res.status(550).json({ message: 'Failed to send email' })
      } else {
        console.log('Email sent successfully')

        return res.status(201).json({
          message: 'User registered successfully. Please verify your email.',
          userId: savedUser._id
        })
      }
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: 'Server error', error: error.message })
  }
}
