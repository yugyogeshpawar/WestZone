import dbConnect from 'src/server/utils/dbConnect';
import InvestHistory from 'src/server/models/investDetail.model';
import Product from 'src/server/models/product.model';

export default async (req, res) => {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            // Fetch all InvestHistory records
            const investHistories = await InvestHistory.find({});

            for (let history of investHistories) {
                // Fetch the product information using productId
                const product = await Product.findById(history.productId);

                if (product) {
                    // Assuming product has fields like terms, dailyIncomeRate, etc.
                    history.terms = product.term;
                    history.dailyIncome = product.dailyIncome;
                    history.totalRevenue = product.totalRevenue;
                    console.log(history);

                    await history.save(); // Save the updated InvestHistory record
                }
            }

            res.status(200).json({ message: 'InvestHistory updated successfully' });
        } catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ error: 'Error updating InvestHistory' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};

