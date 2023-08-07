import User from '../../../server/models/user.model'
import dbConnect from '../../../server/utils/dbConnect'
import jwt from 'jsonwebtoken'

export default async (req, res) => {
  await dbConnect()

  if (req.method === 'GET') {
    try {
      // Get the token from the Authorization header
      const token = req.headers.authorization.split(' ')[1]

      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET) // Replace 'your-secret-key' with your actual secret key

      // Get the user information by ID
      const user = await User.findById(decoded.userId) // Use 'findById' to find the user by ID

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // Send user data back
      res.status(200).json({ user })
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: 'Something went wrong' })
    }
  } else {
    res.status(400).json({ message: 'Only GET requests allowed' })
  }
}
