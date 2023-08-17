/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import {
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import axios from 'axios'
import { Paper } from '@mui/material'

const WithdrawPage = () => {
  const [withdrawalHistory, setWithdrawalHistory] = useState([])
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    // Fetch withdrawal history from the API
    const fetchWithdrawalHistory = async () => {
      const accessToken = window.localStorage.getItem('accessToken')
      if (!accessToken) return

      const headers = { Authorization: `Bearer ${accessToken}` }

      try {
        const response = await axios.get('/api/withdrawRequests', { headers })
        if (response.data && response.data.withdrawRequests) {
          setWithdrawalHistory(response.data.withdrawRequests)
        } else {
          setWithdrawalHistory([])
        }
      } catch (error) {
        console.error('Error fetching withdrawal history:', error)
      }
    }

    fetchWithdrawalHistory()

    // ... your existing code to fetch account details ...
  }, [])

  return (
    <Container  style={{ padding: isMobileView ? '10px' : '24px' }}>
      {/* Withdrawal History */}

      {withdrawalHistory.length === 0 ? (
        <Paper elevation={2} style={{ padding: '16px', textAlign: 'center' }}>
          <Typography variant={isMobileView ? 'body2' : 'body1'}>No Records found</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table size={isMobileView ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Bank</TableCell>
                <TableCell>Account Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {withdrawalHistory.map(record => (
                <TableRow key={record._id}>
                  <TableCell>{new Date(record.requestDate).toLocaleDateString()}</TableCell>
                  <TableCell>{record.amount}</TableCell>
                  <TableCell>{record.status}</TableCell>
                  <TableCell>{record.bankName}</TableCell>
                  <TableCell>{record.accountNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}

export default WithdrawPage
