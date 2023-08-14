import { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Container, Typography, Modal, Box } from '@mui/material';
import axios from 'axios';

function AdminWithdrawRequests() {
    const [requests, setRequests] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [payNowModalOpen, setPayNowModalOpen] = useState(false);
    const [requestToConfirm, setRequestToConfirm] = useState(null);
    const [requestToPay, setRequestToPay] = useState(null);

    const handleOpenModal = (id) => {
        setRequestToConfirm(id);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setRequestToConfirm(null);
        setModalOpen(false);
    };

    const handleOpenPayNowModal = (request) => {
        setRequestToPay(request);
        setPayNowModalOpen(true);
    };

    const handleClosePayNowModal = () => {
        setRequestToPay(null);
        setPayNowModalOpen(false);
    };

    useEffect(() => {
        async function fetchRequests() {
            const accessToken = window.localStorage.getItem('accessToken');
            if (!accessToken) return;

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            };

            try {
                const res = await fetch('/api/admin/withdrawrequests', { headers });
                const data = await res.json();
                setRequests(data.withdrawRequests);
            } catch (error) {
                console.error("Error fetching withdrawal requests:", error);
            }
        }

        fetchRequests();
    }, []);

    const handlePayNow = async () => {
        const data = {
            mode: 'imps',
            amount: requestToPay.amount,
            bank_details: {
                beneficiary_name: requestToPay.realName,
                account_number: requestToPay.accountNumber,
                ifsc: requestToPay.ifscCode
            },
            partner_id: '123412341'
        };

        try {
            const response = await axios.post('https://secure.sharkpe.in/api/v1/payout', data, {
                headers: {
                    'x-token': 'll7s4cwt1f47bf7878dn4pad' // replace with your actual token
                }
            });

            if (response.status === 200) {
                await WithdrawRequest.findByIdAndUpdate(requestToPay._id, { status: 'processed' });
                setRequests(requests.map(req => req._id === requestToPay._id ? { ...req, status: 'processed' } : req));
                handleClosePayNowModal();
            } else {
                console.error('Failed to process payout for:', requestToPay.userName);
            }
        } catch (error) {
            console.error('Error processing payout:', error);
        }
    };

    const handleConfirm = async () => {
        if (requestToConfirm) {
            const accessToken = window.localStorage.getItem('accessToken');
            if (!accessToken) return;

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            };

            try {
                const res = await fetch('/api/admin/withdrawrequests', {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify({ id: requestToConfirm, status: 'processed' })
                });
                const data = await res.json();
                if (data.request) {
                    setRequests(requests.map(req => req._id === requestToConfirm ? data.request : req));
                }
                handleCloseModal();
            } catch (error) {
                console.error("Error confirming withdrawal request:", error);
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Admin Withdraw Requests</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requests.map(request => (
                        <TableRow key={request._id}>
                            <TableCell>{request.userName}</TableCell>
                            <TableCell>{request.amount}</TableCell>
                            <TableCell>{request.status}</TableCell>
                            <TableCell>
                                {request.status !== 'successful' && (
                                    <Button variant='contained' color='secondary' onClick={() => handleOpenPayNowModal(request)} >
                                        Pay Now
                                    </Button>
                                )}
                                {request.status === 'pending' && (
                                    <>
                                        <Button variant='contained' color='primary' onClick={() => handleOpenModal(request._id)} sx={{ ml: 2 }}>
                                            Confirm
                                        </Button>

                                    </>
                                )}

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    <Typography variant='h6' component='h2'>
                        Confirm Withdrawal
                    </Typography>
                    <Typography variant='body1'>
                        Are you sure you want to confirm this withdrawal request?
                    </Typography>
                    <Box mt={2}>
                        <Button onClick={handleCloseModal} variant='contained'>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm} variant='contained' color='primary' sx={{ ml: 2 }}>
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal open={payNowModalOpen} onClose={handleClosePayNowModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    <Typography variant='h6' component='h2'>
                        Confirm Payout
                    </Typography>
                    <Typography variant='body1'>
                        Are you sure you want to execute the payout for {requestToPay?.userName}?
                    </Typography>

                    {/* Displaying payment details */}
                    <Box mt={2} mb={2}>
                        <Typography variant='body2'>
                            <strong>Beneficiary Name:</strong> {requestToPay?.realName}
                        </Typography>
                        <Typography variant='body2'>
                            <strong>Account Number:</strong> {requestToPay?.accountNumber}
                        </Typography>
                        <Typography variant='body2'>
                            <strong>IFSC Code:</strong> {requestToPay?.ifscCode}
                        </Typography>
                        <Typography variant='body2'>
                            <strong>Amount:</strong> {requestToPay?.amount}
                        </Typography>
                    </Box>

                    <Box mt={2}>
                        <Button onClick={handleClosePayNowModal} variant='contained'>
                            Cancel
                        </Button>
                        <Button onClick={handlePayNow} variant='contained' color='primary' sx={{ ml: 2 }}>
                            Pay Now
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
}

export default AdminWithdrawRequests;
