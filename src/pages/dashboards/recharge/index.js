import React, { useState } from 'react';
import axios from 'axios';
import useAuth from 'src/@core/hooks/useAuth';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';


const TopUpPage = ({ open, onClose }) => {
    const { user } = useAuth();
    const [amount, setAmount] = useState('');
    const [paymentLink, setPaymentLink] = useState(null);

    const handleChange = (event) => {
        setAmount(event.target.value);
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
        setPaymentLink(null);
    };

    const handleConfirm = async () => {
        const partnerId = Math.random().toString(36).substr(2, 20);
        console.log(partnerId);

        const data = {
            name: user.username,
            email: user.email,
            number: user.mobileNumber,
            partner_id: partnerId,
            amount: amount,
            status: 'initiated'
        };

        const accessToken = window.localStorage.getItem('accessToken');

        try {
            const headerss = {
                'Authorization': `Bearer ${accessToken}`, // Replace 'accessToken' with your actual access token variable
                'Content-Type': 'application/json'
            }

            const response = await axios.post('/api/transaction/initiate' , data, { headers: headerss });

            const headers = {
                'x-token': 'll1y4w6b1dytbf787874qoz4',
            }

            axios.post('https://secure.sharkpe.in/api/v1/generate', data, { headers })
                .then(response => {
                    setPaymentLink(response.data.payment_link);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });

        } catch (error) {
            console.error('There was an error!', error);
        }




    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Top-Up Wallet</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={amount}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>

            {paymentLink && (
                <Dialog open={Boolean(paymentLink)} fullWidth maxWidth="md">
                    <DialogTitle>Payment</DialogTitle>
                    <iframe src={paymentLink} title="Payment Gateway" width="100%" height="600px" />
                    <DialogActions>
                        <Button onClick={() => setPaymentLink(null)}>Close</Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default TopUpPage;