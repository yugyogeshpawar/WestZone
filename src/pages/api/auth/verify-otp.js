import dbConnect from 'src/server/utils/dbConnect'
import OtpVerification from 'src/server/models/otpVerification.model'
import User from 'src/server/models/user.model'


export default async (req, res) => {
  await dbConnect()

  const { userId, otp } = req.body
  console.log(userId, otp)

  if (!userId || !otp) {
    return res.status(400).json({ message: 'userId and OTP are required' })
  }

  try {
    const otpRecord = await OtpVerification.findOne({ userId })
    console.log(otpRecord)

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid userId or OTP' })
    }

    if (new Date() > new Date(otpRecord.expires)) {
      return res.status(400).json({ message: 'OTP has expired' })
    }

    console.log(otpRecord.otp, otp)

    if (otpRecord.otp == otp) {
      // OTP is verified. Update user status and send response

      await User.findByIdAndUpdate(userId, { status: false })

      return res.json({ message: 'OTP verified successfully' })
    }

    // OTP is verified. You can now mark the user as verified in your database
    // For example, you can update the user document in the 'users' collection to set 'isVerified' to true

    return res.status(400).json({ message: 'Invalid userId or OTP' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred during OTP verification' })
  }
}
