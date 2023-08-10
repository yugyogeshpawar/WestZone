import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (accessToken) {
      const headers = { Authorization: `Bearer ${accessToken}` };

      // Fetching referral income history from the backend using axios
      axios.get('/api/list/dailyincome', { headers })
        .then(response => {
          console.log('Daily income history:', response.data);

          setHistoryData(response.data.dailyIncomes);
        })
        .catch(error => {
          console.error('Error fetching referral income history:', error);
        });
    }
  }, [accessToken]);

  return (
    <div>
      <Typography variant='h4' gutterBottom sx={{ padding: 4 }}>
        Daily Income History
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align='right'>Amount</TableCell>
              <TableCell align='right'>Investment</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {index + 1}
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell align='right'>{row.amount}</TableCell>
                <TableCell align='right'>{row.investPackage}</TableCell>
                <TableCell>{row.paymentStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HistoryPage;
