/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, useTheme, useMediaQuery, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Card, CardContent, Grid, Divider } from '@mui/material';
import { Box, Paper, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import useAuth from 'src/@core/hooks/useAuth'




const WithdrawPage = () => {
    const { user } = useAuth()
    const [amount, setAmount] = useState('');
    const [withdrawalHistory, setWithdrawalHistory] = useState([]);
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [accountDetails, setAccountDetails] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [userNumber, setUserNumber] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('warning');


    const router = useRouter();

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
        router.push('/dashboards/withdraw/addaccount'); // Redirect the user
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleWithdraw = () => {
        if (!amount || parseFloat(amount) <= 0) {
            setSnackbarMessage('Please enter a valid amount to withdraw.');
            setOpenSnackbar(true);

            return;
        }
        setModalOpen(true);
    };

    const handleConfirmWithdraw = () => {
        // Handle the actual withdrawal logic here using userNumber and password
        console.log(`Withdrawing amount: ${amount}`);
        console.log(`User Number: ${userNumber}`);
        console.log(`Password: ${password}`);

        // Close the modal after processing
        handleModalClose();
    };

    useEffect(() => {
        // Fetch withdrawal history from the API or database
        // For now, using sample data
        const sampleData = [];
        setWithdrawalHistory(sampleData);

        // Fetch account details
        const fetchAccountDetails = async () => {
            const accessToken = window.localStorage.getItem('accessToken');
            if (!accessToken) return;

            const headers = { Authorization: `Bearer ${accessToken}` };

            try {
                const response = await axios.get('/api/accountDetails', { headers });
                if (response.data) {
                    setAccountDetails(response.data.accountDetails);
                    console.log("Account details:", response.data.accountDetails);
                } else {
                    setAccountDetails({});
                    router.push('/dashboards/withdraw/addaccount');
                    setOpenSnackbar(true); // Open the snackbar if no account details are found
                }
            } catch (error) {
                setOpenSnackbar(true);
                router.push('/dashboards/withdraw/addaccount');
                console.error("Error fetching account details:", error);
            }
        };

        fetchAccountDetails();
    }, []);

    return (
        <Container maxWidth="sm" style={{ padding: isMobileView ? '10px' : '24px' }}>

            <Card variant="outlined" style={{ marginTop: '24px' }}>
                <CardContent>
                    <Typography variant={isMobileView ? 'h6' : 'h5'} gutterBottom>
                        Account Details
                    </Typography>
                    <Divider style={{ marginBottom: '16px' }} />
                    {accountDetails ? (
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1">Real Name:</Typography>
                                <Typography variant="body1" style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                                    {accountDetails.realName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1">Bank Name:</Typography>
                                <Typography variant="body1" style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                                    {accountDetails.bankName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1">Account Number:</Typography>
                                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                                    {accountDetails.accountNumber}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1">IFSC Code:</Typography>
                                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                                    {accountDetails.ifscCode}
                                </Typography>
                            </Grid>
                        </Grid>
                    ) : (
                        <Typography variant="body1" color="error" style={{ marginTop: '16px' }}>
                            Please update your account details.
                        </Typography>
                    )}
                </CardContent>
            </Card>
            <Paper elevation={3} style={{ padding: '24px', marginTop: '24px' }}>
                <Typography variant={isMobileView ? 'h5' : 'h4'} gutterBottom>
                    Withdraw Funds
                </Typography>
                <Typography variant={isMobileView ? 'body2' : 'body1'} gutterBottom>
                    Please enter the amount you wish to withdraw from your account.
                </Typography>
                <Box mt={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        InputProps={{
                            style: {
                                fontSize: isMobileView ? '0.8rem' : '1rem',
                            },
                        }}
                    />
                </Box>
                <Box mt={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleWithdraw}
                        style={{ fontSize: isMobileView ? '0.8rem' : '1rem' }}
                    >
                        Withdraw
                    </Button>
                </Box>
            </Paper>
            {/* Withdrawal History */}
            <Box mt={4}>
                <Typography variant={isMobileView ? 'h6' : 'h5'} gutterBottom>
                    Withdraw History
                </Typography>
                <Divider variant="middle" style={{ margin: '16px 0' }} />
                {withdrawalHistory.length === 0 ? (
                    <Paper elevation={2} style={{ padding: '16px', textAlign: 'center' }}>
                        <Typography variant={isMobileView ? 'body2' : 'body1'}>
                            No Records found
                        </Typography>
                    </Paper>
                ) : (
                    <TableContainer component={Paper} elevation={3}>
                        <Table size={isMobileView ? 'small' : 'medium'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {withdrawalHistory.map((record) => (
                                    <TableRow key={record.id}>
                                        <TableCell>{record.date}</TableCell>
                                        <TableCell>{record.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: isMobileView ? 'bottom' : 'top', horizontal: 'right' }}
                style={{ marginTop: isMobileView && '48px' }}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: theme.palette.background.default, // or any other color you prefer
                    }
                }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Dialog open={modalOpen} onClose={handleModalClose}>
                <DialogTitle>Confirm Withdrawal</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your number and password to confirm the withdrawal.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Mobile"
                        type="mobileNumber"
                        fullWidth
                        value={userNumber}
                        onChange={(e) => setUserNumber(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmWithdraw} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
};

export default WithdrawPage;
