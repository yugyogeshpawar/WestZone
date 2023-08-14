import dbConnect from 'src/server/utils/dbConnect'
import Product from 'src/server/models/product.model'

export default async (req, res) => {
  await dbConnect()

  const {
    query: { category },
    method
  } = req;

  switch (method) {
    case 'GET':
      if (category) {
        try {
          const products = await Product.find({ category: category, isDeleted: false }).sort({ price: 1 });
          if (!products.length) {
            return res.status(404).json({ error: 'No products found for this category' });
          }
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ error: 'Error fetching products for category' });
        }
      } else {
        try {
          const product = await Product.find({ isDeleted: { $ne: true } }).sort({ price: 1 });

          res.status(200).json(product)
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
        console.log(product)

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
        const deletedProduct = await Product.findByIdAndRemove(id)

        if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found' })
        }

        res.status(200).json({ message: 'Product deleted successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Error deleting product' })
      }
      break
    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}
