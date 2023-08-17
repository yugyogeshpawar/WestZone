import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([])

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
      const headers = { Authorization: `Bearer ${accessToken}` }

      // Fetching recharge history from the backend using axios
      axios
        .get('/api/list/reachagehistory', { headers })
        .then(response => {
          setHistoryData(response.data.transactions)
          console.log('Recharge history:', response.data.transactions)
        })
        .catch(error => {
          console.error('Error fetching recharge history:', error)
        })
    }
  }, [])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };

    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div>
      <Typography variant='h4' gutterBottom sx={{ padding: 4 }}>
        Recharge History
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date/Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {index + 1}
                </TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{formatDate(row.createdAt)}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default HistoryPage
