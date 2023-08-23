import React, { useState, useEffect } from 'react'
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  TablePagination,
  Paper
} from '@mui/material'
import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'

const PayinManager = () => {
  const [transactions, setTransactions] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
        const res = await fetch('/api/admin/payin', { headers })
        const data = await res.json()
        setTransactions(data.transactions.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)))
      } catch (error) {
        console.error('Error fetching pay-in transactions:', error)
      }
    }
    fetchTransactions()
  }, [])

  const handleAction = async (id, action) => {
    const accessToken = window.localStorage.getItem('accessToken')

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    try {
      const res = await fetch('/api/admin/payin', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ id, action })
      })
      const data = await res.json()

      // setTransactions(data.transactions.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)))

      // Set the snackbar state for a successful action
      setOpenSnackbar(true)
      setSnackbarMessage(`Transaction status updated to ${action}.`)
      setSnackbarSeverity('success')
    } catch (error) {
      console.error('Error updating transaction status:', error)

      // Set the snackbar state for a failed action
      setOpenSnackbar(true)
      setSnackbarMessage('Error updating transaction status.')
      setSnackbarSeverity('error')
    }
  }

  const formatDate = dateString => {
    const date = new Date(dateString)

    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Pay-in Manager
      </Typography>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Transaction Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(transaction => (
                <TableRow key={transaction._id}>
                  <TableCell>{transaction.userName}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell>{formatDate(transaction.transactionDate)}</TableCell>
                  <TableCell>
                    <Button
                      variant='contained'
                      color='warning'
                      onClick={() => handleAction(transaction._id, 'pending')}
                    >
                      Pending
                    </Button>
                    <Button
                      variant='contained'
                      color='success'
                      onClick={() => handleAction(transaction._id, 'verified')}
                      style={{ marginLeft: '8px' }}
                    >
                      Verified
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default PayinManager
