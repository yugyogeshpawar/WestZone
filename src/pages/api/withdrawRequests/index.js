// pages/api/withdrawRequests.js
import dbConnect from 'src/server/utils/dbConnect';
import WithdrawRequest from 'src/server/models/withdrawRequest.model';
import authenticate from 'src/server/middlewares/authenticate';
import AccountDetails from 'src/server/models/accountDetails.model';

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

                    const userWithdrawRequests = await WithdrawRequest.find({ userName: username }).lean();

                    if (!userWithdrawRequests || userWithdrawRequests.length === 0) {
                        return res.status(404).json({ message: 'No withdrawal requests found for this user' });
                    }

                    res.status(200).json({ withdrawRequests: userWithdrawRequests });
                } catch (error) {
                    console.error("Error details:", error);
                    res.status(500).json({ error: 'Error fetching withdrawal requests' });
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

                    // Fetch account details for the user
                    const userAccountDetails = await AccountDetails.findOne({ userName: username }, { _id: 0 });



                    if (!userAccountDetails) {
                        return res.status(404).json({ message: 'Account details not found for this user' });
                    }

                    const currentDate = new Date();

                    // Merge the fetched account details with the withdrawal request data
                    const withdrawRequest = {
                        ...req.body,
                        ...userAccountDetails.toObject(), // Convert the mongoose document to a plain object
                        userName: username,
                        requestDate: currentDate
                    };

                    const newWithdrawRequest = new WithdrawRequest(withdrawRequest);
                    await newWithdrawRequest.save();

                    res.status(201).json({ message: 'Withdrawal request created successfully', request: newWithdrawRequest });
                } catch (error) {
                    console.error("Error details:", error);
                    res.status(500).json({ error: 'Error creating withdrawal request' });
                }
            });
            break;


        case 'PUT':
            authenticate(req, res, async () => {
                try {
                    const { username } = req.user;
                    const { id } = req.body; // Assuming the ID of the request to be updated is sent in the body

                    if (!username || !id) {
                        return res.status(400).json({ message: 'Username and request ID are required' });
                    }

                    const updatedRequest = await WithdrawRequest.findByIdAndUpdate(id, req.body, {
                        new: true,
                        runValidators: true
                    });

                    if (!updatedRequest) {
                        return res.status(404).json({ message: 'Withdrawal request not found' });
                    }

                    res.status(200).json({ message: 'Withdrawal request updated successfully', request: updatedRequest });
                } catch (error) {
                    console.error("Error details:", error);
                    res.status(500).json({ error: 'Error updating withdrawal request' });
                }
            });
            break;

        default:
            res.status(405).end(); // Method Not Allowed
            break;
    }
};
