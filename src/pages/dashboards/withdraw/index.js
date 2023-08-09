import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, useTheme, useMediaQuery, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const WithdrawPage = () => {
    const [amount, setAmount] = useState('');
    const [withdrawalHistory, setWithdrawalHistory] = useState([]);
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

    const handleWithdraw = () => {
        // Handle the withdrawal logic here
        console.log(`Withdrawing amount: ${amount}`);
    };

    useEffect(() => {
        // Fetch withdrawal history from the API or database
        // For now, using sample data
        const sampleData = [
            { id: 1, date: '2023-08-10', amount: '$100' },
            { id: 2, date: '2023-08-09', amount: '$150' },
        ];
        setWithdrawalHistory(sampleData);
    }, []);

    return (
        <Container maxWidth="sm" style={{ padding: isMobileView ? '16px' : '32px' }}>
            <Typography variant={isMobileView ? 'h5' : 'h4'} gutterBottom>
                Withdraw Funds
            </Typography>
            <Typography variant={isMobileView ? 'body2' : 'body1'} gutterBottom>
                Please enter the amount you wish to withdraw from your account.
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ margin: '16px 0' }}
                InputProps={{
                    style: {
                        fontSize: isMobileView ? '0.8rem' : '1rem',
                    },
                }}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleWithdraw}
                style={{ fontSize: isMobileView ? '0.8rem' : '1rem', marginBottom: '32px' }}
            >
                Withdraw
            </Button>

            {/* Withdrawal History */}
            <Typography variant={isMobileView ? 'h6' : 'h5'} gutterBottom>
                Withdrawal History
            </Typography>
            <TableContainer component={Paper}>
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
        </Container>
    );
};

export default WithdrawPage;
