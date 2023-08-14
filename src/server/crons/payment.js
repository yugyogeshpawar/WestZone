import dbConnect from 'src/server/utils/dbConnect';
import WithdrawRequest from 'src/server/models/withdrawRequest.model';
import axios from 'axios';

const sendPayouts = async () => {
    await dbConnect();

    try {
        const pendingRequests = await WithdrawRequest.find({ status: 'pending' }).lean();

        console.log('Payout processed for:', pendingRequests);

        for (const request of pendingRequests) {
            const data = {
                mode: 'imps',
                amount: request.amount,
                bank_details: {
                    beneficiary_name: request.userName,
                    account_number: request.accountNumber,
                    ifsc: request.ifscCode
                },
                partner_id: `client_txn_${request._id}`
            };

            // const response = await axios.post('https://secure.sharkpe.in/api/v1/payout', data);

            // if (response.status === 200) {
            //     // Assuming a successful response means the payout was processed
            //     await WithdrawRequest.findByIdAndUpdate(request._id, { status: 'processed' });
            // } else {
            //     console.error('Failed to process payout for:', request.userName);
            // }
        }
    } catch (error) {
        console.error('Error in sendPayouts cron job:', error);
    }
};

// Schedule the cron job to run daily at 2am

sendPayouts();