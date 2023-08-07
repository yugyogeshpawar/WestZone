import User from 'src/server/models/user.model'
import Product from 'src/server/models/product.model'
import InvestHistory from 'src/server/models/investDetail.model'
import dbConnect from 'src/server/utils/dbConnect'
import jwt from 'jsonwebtoken'

export default async function handle(req, res) {
  const { id } = req.query

  if (req.method === 'POST') {
    try {
      await dbConnect()
      const token = req.headers.authorization.split(' ')[1]

      let decodedToken
      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      } catch (err) {
        return res.status(401).json({ message: 'Invalid token' })
      }

      // Fetch user from the database using the userID from the decoded token
      const user = await User.findById(decodedToken.userId)

      // Fetch the product from the database
      const product = await Product.findById(id)

      // Check if user exists and if user has enough balance to buy the product
      if (!user || user.walletBalance < product.price) {
        res.status(403).json({ message: 'Insufficient funds' })
      } else {
        // Deduct product price from user's wallet balance
        user.walletBalance -= product.price
        await user.save()

        const investDetail = new InvestHistory({
          dateTime: new Date(),
          userId: decodedToken.userId,
          userName: decodedToken.username,
          productId: id,
          investPackage: product.price,
          status: 'purchased',
          paymentStatus: 'completed',
          checked: false
        })
        const savedInvestDetail = await investDetail.save()


        res.status(200).json({ message: 'Purchase successful' })
      }
    } catch (error) {
      console.log('error', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(404).json({ message: 'Not Found' })
  }
}
