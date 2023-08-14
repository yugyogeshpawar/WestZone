import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import BlankLayout from 'src/@core/layouts/BlankLayout'

const PaymentCheck = () => {

    const [partnerId, setPartnerId] = useState(null);
    const [transactionStatus, setTransactionStatus] = useState(null);


  

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const verifyPayment = async (partnerId) => {
        try {

            const response = await axios.post('https://secure.sharkpe.in/api/v1/orderStatus', {
                partner_id: partnerId,
                mode: 'payin' //payin, payout
            }, {
                headers: {
                    'x-token': 'll7s4cwt1f47bf7878dn4pad' // replace with your actual token
                }
            });
            console.log(response.data);
            if (response.status === 200 && response.data.order_status === 'success') {
                console.log('Payment verified successfully!');
                await updateTransaction(partnerId, response.data.transaction_id);
                setTransactionStatus('successful');
            } else {
                setTransactionStatus('failed');
                window.open("https://www.westzone.store", "_blank");
            }
        } catch (error) {
            console.error('Error verifying the payment: ', error);
        }
    };

    useEffect(() => {
        const fetchLatestTransaction = async () => {
            console.log('Fetching latest transaction...');
            const accessToken = window.localStorage.getItem('accessToken');
            try {
                const response = await axios.get('/api/transaction/initiate', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                if (response.data && response.data.partner_id) {
                    setPartnerId(response.data.partner_id);
                    console.log('Verifying the payment...');
                    verifyPayment(response.data.partner_id);
                }
                if (response.status == 404) {
                    setTransactionStatus('failed');
                    window.open("https://www.westzone.store", "_blank");
                }

            } catch (error) {
                setTransactionStatus('failed');
                console.error('Error fetching the latest transaction: ', error);
                window.open("https://www.westzone.store", "_blank");
            }
        };

        fetchLatestTransaction();
    }, [verifyPayment]);

    const updateTransaction = async (partnerId, transaction_id) => {
        console.log('Updating the transaction...');
        const accessToken = window.localStorage.getItem('accessToken');
        try {
            const response = await axios.put('/api/transaction/initiate', {
                partner_id: partnerId,
                transactionId: transaction_id,
                status: 'successful'
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.status !== 200) {
                setTransactionStatus('failed');
                window.open("https://www.westzone.store", "_blank");
            }

        } catch (error) {
            console.error('Error updating the transaction: ', error);
        }
    };

    return (
        <div>
            {transactionStatus === 'successful' ? (
                <>
                    <p>Your transaction was successful!</p>
                    <p>Please close this popup window.</p>
                </>
            ) : transactionStatus === 'failed' ? (
                <><p style={{ color: 'red' }}>Sorry, there was an issue with your transaction.</p><h3>Please close this popup window.</h3></>
            ) : (
                <CircularProgress />
            )}
        </div>
    );

}

PaymentCheck.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default PaymentCheck
