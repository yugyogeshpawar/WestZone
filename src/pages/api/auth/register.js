import User from 'src/server/models/user.model'
import bcrypt from 'bcryptjs'
import dbConnect from 'src/server/utils/dbConnect'

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

  const emailExists = await User.findOne({ $or: [{ email }] })

  if (!email || !/\S+@\S+\.\S+/.test(email) || emailExists) {
    return res.status(400).json({ message: 'Invalid email address' })
  }

  // Validate password
  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' })
  }

  // Validate mobileNumber
  if (!mobileNumber || !/^[\d]{10,15}$/.test(mobileNumber)) {
    return res.status(400).json({ message: 'Invalid mobile number' })
  }

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

    const userExists = await User.findOne({ $or: [{ username }, { mobileNumber }] })

    if (userExists) {
      return res.status(400).json({ message: 'Username or mobile number already taken' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      password: hashedPassword,
      mobileNumber,
      email,
      sponsorId,
      sponsorName
    })

    const savedUser = await newUser.save()

    res.status(201).json({ message: 'User registered successfully', userId: savedUser._id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
