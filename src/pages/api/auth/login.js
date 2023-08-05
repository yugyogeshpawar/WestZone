import User from '../../../server/models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dbConnect from '../../../server/utils/dbConnect'

export default async (req, res) => {
  await dbConnect()

  if (req.method === 'POST') {
    const { mobileNumber, password } = req.body

    const user = await User.findOne({ mobileNumber })

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password ...' })
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({ message: 'This user is blocked.' })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid username or password' })
    }

    // At this point, the user is authenticated. You can generate a token or start a session here.

    // Create a payload for the JWT. Include any user information you want to store in the token.
    const payload = {
      userId: user._id,
      username: user.username
    }

    // Sign the token with a secret key to generate the JWT.
    const accessToken = jwt.sign(payload, 'your-secret-key', {
      expiresIn: '1h' // Set the token expiration time (e.g., 1 hour).
    })

    // Return the JWT in the response.
    res.status(200).json({ message: 'User logged in successfully', accessToken })
  } else {
    res.status(400).json({ message: 'Only POST requests allowed' })
  }
}
