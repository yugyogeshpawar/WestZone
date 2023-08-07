import dbConnect from '../../../server/utils/dbConnect'
import Product from '../../../server/models/product.model'

export default async (req, res) => {
  await dbConnect()

  if (req.method === 'POST') {
    const { name, description, price, image, term, dailyIncome, totalRevenue } = req.body

    // Basic validation
    if (!name || !description || !price || !image || !term || !dailyIncome || !totalRevenue) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    try {
      const product = new Product({ name, description, price, image, term, dailyIncome, totalRevenue })
      await product.save()
      res.status(201).json({ message: 'Product created successfully', product })
    } catch (error) {
      res.status(500).json({ error: 'Error creating product' })
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
