import dbConnect from 'src/server/utils/dbConnect'
import Product from 'src/server/models/product.model'

export default async (req, res) => {
  await dbConnect()

  if (req.method === 'POST') {
    const { name, description, price, image, term, dailyIncome, totalRevenue, category } = req.body
    console.log(req.body)

    // Basic validation
    if (!name || !description || !price || !image || !term || !dailyIncome || !totalRevenue || !category) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    try {
      const product = new Product({ name, description, price, image, term, dailyIncome, totalRevenue, category })
      const resp = await product.save()
      console.log(resp);
      res.status(201).json({ message: 'Product created successfully', product })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error creating product', error })
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
