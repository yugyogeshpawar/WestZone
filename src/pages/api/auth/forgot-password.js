import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from 'src/server/models/user.model'
import ResetPassword from 'src/server/models/resetPassword.model' // <-- Import the new schema
import connectDb from 'src/server/utils/dbConnect'
import sendEmail from 'src/server/utils/sendEmail'

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
      console.log(resetUrl);
      const emailText = `You are receiving this email because you (or someone else) have requested to reset a password for your account. Please click on the link provided or copy and paste this URL into your browser to complete the process: \n\n ${resetUrl} \n\nIf you did not request this, please ignore this email and your password will remain unchanged.`
      await sendEmail(user.email, resetUrl, emailText)

      return res.status(200).json({ success: true, message: 'Reset password link has been sent to your email address' })
    } catch (error) {
      console.error(error)

      return res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
  }
}
