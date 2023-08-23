// src/server/pages/api/transactions.js
import dbConnect from 'src/server/utils/dbConnect';
import Transaction from 'src/server/models/transaction.model';
import authenticate from 'src/server/middlewares/authenticate';

export default async (req, res) => {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      authenticate(req, res, async () => {
        try {
          const transactions = await Transaction.find({}).lean();
          res.status(200).json({ transactions });
        } catch (error) {
          console.error("Error fetching transactions:", error);
          res.status(500).json({ error: 'Error fetching transactions' });
        }
      });
      break;

    // Handle other methods (POST, PUT, DELETE) ...

    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
};
