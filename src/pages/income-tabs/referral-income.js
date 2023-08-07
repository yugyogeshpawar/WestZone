import React from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const HistoryPage = () => {
  // Replace this with actual data
  const historyData = [
    {
      date: '2023-07-30',
      income: 100,
      percent: 10,
      status: 'Success'
    },
    {
      date: '2023-07-29',
      income: 80,
      percent: 8,
      status: 'Success'
    }
  ]

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
              <TableCell align='right'>Percent (%)</TableCell>
              <TableCell align='right'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {row.date}
                </TableCell>
                <TableCell align='right'>{row.income}</TableCell>
                <TableCell align='right'>{row.percent}</TableCell>
                <TableCell align='right'>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default HistoryPage
