import dbConnect from 'src/server/utils/dbConnect'
import User from 'src/server/models/user.model'

export default async (req, res) => {
  await dbConnect()

  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({})
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        const user = await User.create(req.body)
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        const user = await User.findByIdAndUpdate(req.body.id, req.body, {
          new: true,
          runValidators: true
        })
        if (!user) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE':
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.body.id,
          { isBlocked: true },
          {
            new: true,
            runValidators: true
          }
        )
        if (!updatedUser) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: updatedUser })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
