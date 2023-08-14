import dbConnect from 'src/server/utils/dbConnect';
import Product from 'src/server/models/product.model';

export default async (req, res) => {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Fetch all products in ascending order of price
      const products = await Product.find({}).sort({ price: 1 }).exec();

      // Update the sortingOrder for each product
      for (let i = 0; i < products.length; i++) {
        products[i].sortingOrder = i + 1; // Set sortingOrder starting from 1
        await products[i].save();
      }

      res.status(200).json({ message: 'Updated sortingOrder for all products' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating sortingOrder' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
