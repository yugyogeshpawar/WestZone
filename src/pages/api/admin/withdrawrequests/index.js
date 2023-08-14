import dbConnect from 'src/server/utils/dbConnect';
import WithdrawRequest from 'src/server/models/withdrawRequest.model';
import authenticate from 'src/server/middlewares/authenticate';

export default async (req, res) => {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            authenticate(req, res, async () => {
                try {
                    const withdrawRequests = await WithdrawRequest.find({}).lean();
                    res.status(200).json({ withdrawRequests });
                } catch (error) {
                    console.error("Error fetching withdrawal requests:", error);
                    res.status(500).json({ error: 'Error fetching withdrawal requests' });
                }
            });
            break;

        case 'PUT':
            authenticate(req, res, async () => {
                const { id, status } = req.body;
                if (!id || !status) {
                    return res.status(400).json({ message: 'ID and status are required' });
                }

                try {
                    const updatedRequest = await WithdrawRequest.findByIdAndUpdate(id, { status }, {
                        new: true,
                        runValidators: true
                    });

                    console.log("Updated request:", updatedRequest);

                    if (!updatedRequest) {
                        return res.status(404).json({ message: 'Withdrawal request not found' });
                    }

                    res.status(200).json({ message: 'Withdrawal request updated successfully', request: updatedRequest });
                } catch (error) {
                    console.error("Error updating withdrawal request:", error);
                    res.status(500).json({ error: 'Error updating withdrawal request' });
                }
            });
            break;

        default:
            res.status(405).end(); // Method Not Allowed
            break;
    }
};
