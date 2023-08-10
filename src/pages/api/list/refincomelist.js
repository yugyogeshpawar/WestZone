import dbConnect from 'src/server/utils/dbConnect';
import authenticate from 'src/server/middlewares/authenticate';
import RefIncome from 'src/server/models/refIncome.model';

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
                    const refIncomes = await RefIncome.find({ sponsorId: username });
                    if (!refIncomes || refIncomes.length === 0) {
                        return res.status(404).json({ message: 'No referral incomes found for this user' });
                    }
                    res.status(200).json({ refIncomes });
                } catch (error) {
                    console.error("Error details:", error);
                    res.status(500).json({ error: 'Error fetching referral incomes' });
                }
            });
            break;

        case 'POST':
            authenticate(req, res, async () => {
                try {
                    const { sponsorId, referredUserId, amount, username } = req.body;
                    if (!sponsorId || !referredUserId || !amount || !username) {
                        return res.status(400).json({ message: 'All fields are required' });
                    }

                    const newRefIncome = new RefIncome({
                        sponsorId,
                        referredUserId,
                        amount,
                        username
                    });
                    const savedRefIncome = await newRefIncome.save();
                    res.status(201).json({ message: 'Referral income added successfully', refIncome: savedRefIncome });
                } catch (error) {
                    console.error("Error details:", error);
                    res.status(500).json({ error: 'Error adding referral income' });
                }
            });
            break;

        // You can add more methods (PUT, DELETE, etc.) as needed

        default:
            res.status(405).end(); // Method Not Allowed
            break;
    }
};
