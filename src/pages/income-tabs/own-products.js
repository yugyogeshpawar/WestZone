import React from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const HistoryPage = () => {
  // Replace this with actual data
  const historyData = [
    {
      no: 1,
      dateTime: '2023-07-30 12:00',
      price: 200,
      status: 'Active',
      dailyIncome: 10,
      totalRevenue: 300,
      availableAmount: 100
    },
    {
      no: 2,
      dateTime: '2023-07-29 11:00',
      price: 150,
      status: 'Active',
      dailyIncome: 8,
      totalRevenue: 250,
      availableAmount: 80
    }
  ]

  return (
    <div>
      <Typography variant='h4' gutterBottom sx={{ padding: 4 }}>
        Own Products
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Date Time</TableCell>
              <TableCell align='right'>Price ($)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='right'>Daily Income ($)</TableCell>
              <TableCell align='right'>Total Revenue ($)</TableCell>
              <TableCell align='right'>Available Amount ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map(row => (
              <TableRow key={row.no}>
                <TableCell component='th' scope='row'>
                  {row.no}
                </TableCell>
                <TableCell>{row.dateTime}</TableCell>
                <TableCell align='right'>{row.price}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell align='right'>{row.dailyIncome}</TableCell>
                <TableCell align='right'>{row.totalRevenue}</TableCell>
                <TableCell align='right'>{row.availableAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default HistoryPage
