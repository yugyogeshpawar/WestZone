import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, TextField, Typography, Container, useTheme, useMediaQuery, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const AddAccountDetails = () => {
    const [realName, setRealName] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const theme = useTheme();
    const router = useRouter();
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchAccountDetails = async () => {
            const accessToken = window.localStorage.getItem('accessToken');

            if (accessToken) {
                const headers = { Authorization: `Bearer ${accessToken}` };

                try {
                    const response = await axios.get('/api/accountDetails', { headers });
                    const { realName, bankName, accountNumber, ifscCode } = response.data.accountDetails;
                    setSnackbarMessage(response.data.message);
                    setSnackbarSeverity('success');
                    setRealName(realName || '');
                    setBankName(bankName || '');
                    setAccountNumber(accountNumber || '');
                    setIfscCode(ifscCode || '');
                } catch (error) {
                    setSnackbarMessage("Error updating account details");
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                }
            }
        };

        fetchAccountDetails();
    }, []);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleSubmit = async () => {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken) {
            const headers = { Authorization: `Bearer ${accessToken}` };

            try {
                const response = await axios.post('/api/accountDetails', {
                    realName,
                    bankName,
                    accountNumber,
                    ifscCode
                }, { headers });

                // Handle the successful response
                setSnackbarMessage("Data saved successfully");
                setSnackbarSeverity('success');
                setSnackbarOpen(true);

                // Redirect after a short delay to give users a chance to see the snackbar
                setTimeout(() => {
                    router.push('/dashboards/withdraw');
                }, 2000); // Redirect after 2 seconds

            } catch (error) {
                console.error("Error updating account details:", error);
                setSnackbarMessage("Error updating account details");
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        }
    };

    return (
        <Container maxWidth="sm" style={{ padding: isMobileView ? '16px' : '32px' }}>
            <Typography variant={isMobileView ? 'h5' : 'h4'} gutterBottom>
                Add Account Details
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                label="Real Name"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                style={{ margin: '6px 0' }}
            />
            <TextField
                fullWidth
                variant="outlined"
                label="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                style={{ margin: '6px 0' }}
            />
            <TextField
                fullWidth
                variant="outlined"
                label="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                style={{ margin: '6px 0' }}
            />
            <TextField
                fullWidth
                variant="outlined"
                label="IFSC Code"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
                style={{ margin: '6px 0' }}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                style={{ fontSize: isMobileView ? '0.8rem' : '1rem', marginTop: '32px' }}
            >
                Save Details
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: isMobileView ? 'bottom' : 'top', horizontal: 'right' }}
                style={{ marginTop: isMobileView && '48px' }}
            >
                <Alert onClose={handleCloseSnackbar} variant='filled'  severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AddAccountDetails;
