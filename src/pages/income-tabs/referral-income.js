import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
      const headers = { Authorization: `Bearer ${accessToken}` };

      // Fetching referral income history from the backend using axios
      axios.get('/api/list/refincomelist', { headers })
        .then(response => {
          setHistoryData(response.data.refIncomes);
          console.log('Referral income history:', response.data.refIncomes); T
        })
        .catch(error => {
          console.error('Error fetching referral income history:', error);
        });
    }
  }, []);

  return (
    <div>
      <Typography variant='h4' gutterBottom sx={{ padding: 4 }}>
        Referral Income History
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align='right'>Income ($)</TableCell>
              <TableCell align='right'>Referral</TableCell>
              <TableCell align='right'>Level</TableCell>
              <TableCell align='right'>Investment.</TableCell>
              <TableCell align='right'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {new Date(row.date).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </TableCell>
                <TableCell align='right'>{row.amount}</TableCell>
                <TableCell align='right'>{row.referredUserId}</TableCell>
                <TableCell align='right'>{row.level}</TableCell>
                <TableCell align='right'>{row.investAmount}</TableCell>
                <TableCell align='right'>{row.status ? 'Sucessfull' : 'False'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default HistoryPage;
