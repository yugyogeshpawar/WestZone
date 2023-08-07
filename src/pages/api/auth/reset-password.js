import connectDB from '../../../server/utils/dbConnect'
import User from '../../../server/models/user.model'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

connectDB()

export default async (req, res) => {
  if (req.method === 'PUT') {
    const { resetPasswordLink, newPassword } = req.body

    if (resetPasswordLink) {
      crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
          return res.status(400).json({ error: 'Something went wrong. Try later.' })
        }

        const resetToken = buffer.toString('hex')
        let user

        try {
          user = await User.findOne({ resetPasswordLink })
        } catch (error) {
          return res.status(400).json({ error: 'Invalid or expired link.' })
        }

        if (!user) {
          return res.status(400).json({ error: 'Invalid or expired link.' })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12)

        user.password = hashedPassword
        user.resetPasswordLink = ''

        try {
          await user.save()
        } catch (error) {
          return res.status(400).json({ error: 'Error resetting user password.' })
        }

        res.status(200).json({ message: 'Password updated successfully.' })
      })
    } else {
      return res.status(400).json({ error: 'Invalid request.' })
    }
  } else {
    res.status(400).json({ error: 'Invalid request.' })
  }
}
