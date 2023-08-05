import User from '../../../server/models/user.model';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../server/utils/dbConnect';

export default async (req, res) => {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { username, password, mobileNumber, email, sponsorId } = req.body;

  // Validate username
  if (!username || username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    return res.status(400).json({ message: 'Invalid username' });
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // Validate password
  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  let sponsorName = 'westzone'; // Default value

  try {
    if (sponsorId) {
      const sponsor = await User.findOne({ username: sponsorId });
      if (sponsor) {
        sponsorName = sponsor.username; // sponsorName corresponds to the username of the sponsor
      } else {
        sponsorName = null; // Set to null if sponsorId is invalid
        sponsorId = null; // Also setting sponsorId to null as it is invalid
      }
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      mobileNumber,
      email,
      sponsorId, // Now represents the username of the sponsor
      sponsorName,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully', userId: savedUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }

};
