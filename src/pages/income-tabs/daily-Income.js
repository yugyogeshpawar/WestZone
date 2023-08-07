import React from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const HistoryPage = () => {
  // Replace this with actual data
  const historyData = [
    {
      no: 1,
      date: '2023-07-30',
      percent: 10,
      product: 'Product 1'
    },
    {
      no: 2,
      date: '2023-07-29',
      percent: 8,
      product: 'Product 2'
    }
  ]

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
              <TableCell align='right'>Percent (%)</TableCell>
              <TableCell>Product</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map(row => (
              <TableRow key={row.no}>
                <TableCell component='th' scope='row'>
                  {row.no}
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell align='right'>{row.percent}</TableCell>
                <TableCell>{row.product}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default HistoryPage
