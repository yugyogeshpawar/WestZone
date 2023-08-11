// pages/api/accountDetails/[id].js
import dbConnect from 'src/server/utils/dbConnect';
import AccountDetails from 'src/server/models/accountDetails.model';
import authenticate from 'src/server/middlewares/authenticate';

export default async (req, res) => {
    await dbConnect();

    const {
        query: { id },
        method,
      } = req;

    switch (method) {
        case 'GET':
            authenticate(req, res, async () => {
                try {
                    const { username } = req.user;

                    if (!username) {
                        return res.status(400).json({ message: 'Username is required' });
                    }
                    console.log("username:", username);

                    const userAccountDetails = await AccountDetails.find({ userName: username }).lean();

                    if (!userAccountDetails || userAccountDetails.length === 0) {
                        return res.status(404).json({ message: 'No account details found for this user' });
                    }

                    res.status(200).json({ accountDetails: userAccountDetails[0] });
                } catch (error) {
                    console.error("Error details:", error);
                    res.status(500).json({ error: 'Error fetching account details' });
                }
            });
            break;
            
        case 'POST':
            authenticate(req, res, async () => {
                try {
                    const { username } = req.user;

                    if (!username) {
                        return res.status(400).json({ message: 'Username is required' });
                    }

                    const accountDetails = { ...req.body, userName: username };

                    console.log("accountDetails:", accountDetails);

                    // Upsert operation
                    const updatedAccount = await AccountDetails.findOneAndUpdate(
                        { userName: username },
                        accountDetails,
                        {
                            new: true,
                            upsert: true, // This will create a new document if one doesn't exist
                            runValidators: true
                        }
                    );
                    console.log("updatedAccount:", updatedAccount);

                    if (updatedAccount) {
                        res.status(200).json({ message: 'Account details saved successfully', account: updatedAccount });
                    } else {
                        throw new Error('Failed to save account details');
                    }
                } catch (error) {
                    console.error("Error details:", error);
                    res.status(500).json({ error: 'Error saving account details' });
                }
            });
            break;

        default:
            res.status(405).end(); // Method Not Allowed
            break;
    }
};
