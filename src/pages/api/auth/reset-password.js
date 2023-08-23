import connectDB from '../../../server/utils/dbConnect'
import User from '../../../server/models/user.model'
import ResetPassword from 'src/server/models/resetPassword.model'
import bcrypt from 'bcryptjs'

connectDB()

export default async (req, res) => {
  if (req.method === 'POST') {
    const { resetPasswordToken, newPassword } = req.body

    // Check if resetPasswordToken and newPassword are provided
    if (!resetPasswordToken || !newPassword) {
      return res.status(400).json({ error: 'Invalid request. Token and new password are required.' })
    }

    try {
      // Find the reset password document by the provided token
      const resetDoc = await ResetPassword.findOne({ resetPasswordToken: resetPasswordToken })
      console.log(resetDoc)

      // Check if reset token is valid or expired
      if (!resetDoc || resetDoc.expireDate < Date.now()) {
        return res.status(400).json({ error: 'Invalid or expired token.' })
      }

      // Find the associated user
      const user = await User.findById(resetDoc.userId)

      // Check if user exists
      if (!user) {
        return res.status(400).json({ error: 'User not found.' })
      }

      // Update the user's password
      const hashedPassword = await bcrypt.hash(newPassword, 12)
      user.password = hashedPassword
      await user.save()

      // Remove the reset document since it's no longer needed
      await ResetPassword.findByIdAndDelete(resetDoc._id)

      return res.status(200).json({ message: 'Password updated successfully.' })
    } catch (error) {
      console.error('Error in password reset:', error)

      return res.status(500).json({ error: 'Internal server error.' })
    }
  } else {
    res.status(400).json({ error: 'Invalid request.' })
  }
}
