import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from 'src/server/models/user.model'
import ResetPassword from 'src/server/models/resetPassword.model' // <-- Import the new schema
import connectDb from 'src/server/utils/dbConnect'
import nodemailer from 'nodemailer'

connectDb()

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ success: false, error: 'User does not exist' })
      }

      // Create reset token
      const resetToken = crypto.randomBytes(20).toString('hex')
      const resetPasswordToken = jwt.sign({ resetToken }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

      // Save token details in resetPassword collection
      await new ResetPassword({
        userId: user._id,
        resetPasswordToken,
        resetPasswordExpires: Date.now() + 3600000
      }).save()

      // Send reset link via email
      const resetUrl = `${req.headers.origin}/auth/reset-password?token=${resetPasswordToken}`

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
        subject: '[Promoquo] Reset Password Link',
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
          ` ${resetUrl}\n\n` +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      }

      transporter.sendMail(mailOptions, (err, _) => {
        if (err) {
          console.log('ERROR: Unable to send email', err)

          return res.status(550).json({
            message: 'Failed to send email'
          })
        } else {
          console.log('Email sent successfully')

          return res.status(200).json({
            message: `Recovery email sent to ${email}`
          })
        }
      })

      return res.status(200).json({ success: true, message: 'Reset password link has been sent to your email address' })
    } catch (error) {
      console.error(error)

      return res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
  }
}
