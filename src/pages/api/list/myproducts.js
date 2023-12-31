// // File: /api/list/myproducts.js

// import dbConnect from 'src/server/utils/dbConnect';
// import InvestHistory from 'src/server/models/investDetail.model'; // Assuming you have a model named InvestHistory for the investhistories collection
// import authenticate from 'src/server/middlewares/authenticate';

// export default async (req, res) => {
//     await dbConnect();

//     const { method } = req;

//     switch (method) {
//         case 'GET':
//             authenticate(req, res, async () => {
//                 try {
//                     const { username } = req.user;

//                     if (!username) {
//                         return res.status(400).json({ message: 'Username is required' });
//                     }

//                     const userProducts = await InvestHistory.find({ userName: username });

//                     if (!userProducts || userProducts.length === 0) {
//                         return res.status(204).json({ message: 'No products found for this user' }); // 204 No Content is more appropriate for no data
//                     }

//                     res.status(200).json({ products: userProducts });
//                 } catch (error) {
//                     console.error("Error details:", error);
//                     res.status(500).json({ error: 'Error fetching products' });
//                 }
//             });
//             break;

//         default:
//             res.status(405).end(); // Method Not Allowed
//             break;
//     }
// };


// File: /api/list/myproducts.js

import dbConnect from 'src/server/utils/dbConnect';
import InvestHistory from 'src/server/models/investDetail.model'; // Assuming you have a model named InvestHistory for the investhistories collection
import Product from 'src/server/models/product.model'; // Importing the Product model
import authenticate from 'src/server/middlewares/authenticate';

export default async (req, res) => {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            authenticate(req, res, async () => {
                try {
                    const { username } = req.user;

                    if (!username) {
                        return res.status(400).json({ message: 'Username is required' });
                    }

                    const userProducts = await InvestHistory.find({ userName: username });

                    if (!userProducts || userProducts.length === 0) {
                        return res.status(204).json({ message: 'No products found for this user' }); // 204 No Content is more appropriate for no data
                    }

                    // New array to hold user products with their respective image URLs
                    const productsWithImages = [];

                    for (const product of userProducts) {
                        const productDetail = await Product.findOne({ _id: product.productId });
                        console.log(productDetail);
                        
                        // Assuming the product model has an imageUrl field
                        if (productDetail) {
                            productsWithImages.push({ ...product._doc, image: productDetail.image });
                        }
                    }

                    res.status(200).json({ products: productsWithImages });
                } catch (error) {
                    console.error("Error details:", error);
                    res.status(500).json({ error: 'Error fetching products' });
                }
            });
            break;

        default:
            res.status(405).end(); // Method Not Allowed
            break;
    }
};
