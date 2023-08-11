import dbConnect from 'src/server/utils/dbConnect'
import Product from 'src/server/models/product.model'

export default async (req, res) => {
  await dbConnect()

  const {
    query: { id },
    method
  } = req

  switch (method) {
    case 'GET':
      if (id) {
        try {
          const product = await Product.findOne({ _id: id, isDeleted: false }) // Check for isDeleted: false
          if (!product) {
            return res.status(404).json({ error: 'Product not found' })
          }
          res.status(200).json(product)
        } catch (error) {
          res.status(500).json({ error: 'Error fetching product' })
        }
      } else {
        try {
          const products = await Product.find({})
          res.status(200).json(products)
        } catch (error) {
          res.status(500).json({ error: 'Error fetching products' })
        }
      }
      break
    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })

        if (!product) {
          return res.status(404).json({ error: 'Product not found' })
        }

        res.status(200).json({ message: 'Product updated successfully', product })
      } catch (error) {
        res.status(500).json({ error: 'Error updating product' })
      }
      break
    case 'DELETE':
      try {
        const product = await Product.findByIdAndUpdate(id, { isDeleted: true }, {
          new: true,
          runValidators: true
        })

        if (!product) {
          return res.status(404).json({ error: 'Product not found' })
        }

        res.status(200).json({ message: 'Product marked as deleted successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Error marking product as deleted' })
      }
      break;
    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}
