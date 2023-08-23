import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  TablePagination
} from '@mui/material'

const AdminTransactionDetails = () => {
  const [transactions, setTransactions] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    const fetchTransactions = async () => {
      const accessToken = window.localStorage.getItem('accessToken')
      if (!accessToken) {
        console.error('No access token found')

        return
      }

      const headers = { Authorization: `Bearer ${accessToken}` }

      try {
        const response = await axios.get('/api/admin/transactions/all', { headers })

        const sortedTransactions = response.data.transactions.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        setTransactions(sortedTransactions)
      } catch (error) {
        console.error('Error fetching transactions:', error)
      }
    }

    fetchTransactions()
  }, [])

  const handleSearchChange = event => {
    setSearch(event.target.value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const filteredTransactions = transactions.filter(transaction =>
    transaction.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container>
      <Typography variant='h4' component='h2' gutterBottom>
        Admin Transaction Details
      </Typography>
      <TextField label='Search by Name' variant='outlined' value={search} onChange={handleSearchChange} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Partner ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction, index) => (
                <TableRow key={transaction._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>{transaction.email}</TableCell>
                  <TableCell>{transaction.number}</TableCell>
                  <TableCell>{transaction.partner_id}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell>{moment(transaction.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={filteredTransactions.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  )
}

export default AdminTransactionDetails
