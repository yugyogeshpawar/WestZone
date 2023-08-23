import { useState, useEffect } from 'react'
import { Snackbar, Alert } from '@mui/material'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Typography,
  Modal,
  Box,
  Pagination
} from '@mui/material'
import axios from 'axios'

function AdminWithdrawRequests() {
  const [loading, setLoading] = useState(false)
  const [requests, setRequests] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [payNowModalOpen, setPayNowModalOpen] = useState(false)
  const [requestToConfirm, setRequestToConfirm] = useState(null)
  const [requestToPay, setRequestToPay] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [failedSnackbarOpen, setFailedSnackbarOpen] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const handleOpenModal = id => {
    setRequestToConfirm(id)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setRequestToConfirm(null)
    setModalOpen(false)
  }

  const handleOpenPayNowModal = request => {
    setRequestToPay(request)
    setPayNowModalOpen(true)
  }

  const handleClosePayNowModal = () => {
    setRequestToPay(null)
    setPayNowModalOpen(false)
  }

  useEffect(() => {
    async function fetchRequests() {
      const accessToken = window.localStorage.getItem('accessToken')
      if (!accessToken) return

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }

      try {
        const res = await fetch('/api/admin/withdrawrequests', { headers })
        const data = await res.json()
        const sortedRequests = data.withdrawRequests.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate))
        setRequests(sortedRequests)
      } catch (error) {
        console.error('Error fetching withdrawal requests:', error)
      }
    }

    fetchRequests()
  }, [])

  const handlePayNow = async () => {
    setLoading(true)
    const partnerId = Math.random().toString(36).substr(2, 20)

    const data = {
      mode: 'imps',
      amount: requestToPay.amount,
      bank_details: {
        beneficiary_name: requestToPay.realName,
        account_number: requestToPay.accountNumber,
        ifsc: requestToPay.ifscCode
      },
      partner_id: partnerId
    }

    try {
      // First, update the partner_id on your API
      const accessToken = window.localStorage.getItem('accessToken')

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }

      const response22 = await fetch('/api/admin/withdrawrequests', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ id: requestToPay._id, partner_id: partnerId, status: 'processed' })
      })

      // const data = await response22.json()

      // Then, call the Sharkpe API

      const response = await axios.post('https://secure.sharkpe.in/api/v1/payout', data, {
        headers: {
          'x-token': 'llgae3o51gh0bf7878ez1eke' // replace with your actual token
        }
      })

      if (response.status === 200) {
        // setRequests(requests.map(req => (req._id === requestToPay._id ? { ...req, status: 'processed' } : req)))
        handleClosePayNowModal()
        setSnackbarOpen(true) // Open the success snackbar
      } else {
        console.error('Failed to process payout for:', requestToPay.userName)
        setFailedSnackbarOpen(true) // Open the failed snackbar
      }
    } catch (error) {
      console.error('Error processing payout:', error)
      setFailedSnackbarOpen(true) // Open the failed snackbar
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async () => {
    if (requestToConfirm) {
      const accessToken = window.localStorage.getItem('accessToken')
      if (!accessToken) return

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }

      try {
        const res = await fetch('/api/admin/withdrawrequests', {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify({ id: requestToConfirm, status: 'processed' })
        })
        const data = await res.json()
        if (data.request) {
          setRequests(requests.map(req => (req._id === requestToConfirm ? data.request : req)))
        }
        handleCloseModal()
      } catch (error) {
        console.error('Error confirming withdrawal request:', error)
      }
    }
  }

  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }

    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString))
  }

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Admin Withdraw Requests
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Partner Id</TableCell>
            <TableCell>Request Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(request => (
            <TableRow key={request._id}>
              <TableCell>{request.userName}</TableCell>
              <TableCell>{request.amount}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>{request.partner_id}</TableCell>
              <TableCell>{formatDate(request.requestDate)}</TableCell>
              <TableCell>
                {request.status !== 'successful' && request.status !== 'success' && (
                  <Button variant='contained' color='secondary' onClick={() => handleOpenPayNowModal(request)}>
                    Pay Now
                  </Button>
                )}

                {request.status === 'pending' && (
                  <>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => handleOpenModal(request._id)}
                      sx={{ ml: 2 }}
                    >
                      Confirm
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box mt={2}>
        <Pagination
          count={Math.ceil(requests.length / pageSize)}
          page={currentPage}
          onChange={(event, page) => {
            setCurrentPage(page)
          }}
        />
      </Box>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography variant='h6' component='h2'>
            Confirm Withdrawal
          </Typography>
          <Typography variant='body1'>Are you sure you want to confirm this withdrawal request?</Typography>
          <Box mt={2}>
            <Button onClick={handleCloseModal} variant='contained'>
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant='contained' color='primary' sx={{ ml: 2 }}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={payNowModalOpen} onClose={handleClosePayNowModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Typography variant='h6' component='h2'>
                Confirm Payout
              </Typography>
              <Typography variant='body1'>
                Are you sure you want to execute the payout for {requestToPay?.userName}?
              </Typography>

              {/* Displaying payment details */}
              <Box mt={2} mb={2}>
                <Typography variant='body2'>
                  <strong>Beneficiary Name:</strong> {requestToPay?.realName}
                </Typography>
                <Typography variant='body2'>
                  <strong>Account Number:</strong> {requestToPay?.accountNumber}
                </Typography>
                <Typography variant='body2'>
                  <strong>IFSC Code:</strong> {requestToPay?.ifscCode}
                </Typography>
                <Typography variant='body2'>
                  <strong>Amount:</strong> {requestToPay?.amount}
                </Typography>
              </Box>

              <Box mt={2}>
                <Button onClick={handleClosePayNowModal} variant='contained'>
                  Cancel
                </Button>
                <Button onClick={handlePayNow} variant='contained' color='primary' sx={{ ml: 2 }}>
                  Pay Now
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity='success'>
          Payout successful!
        </Alert>
      </Snackbar>

      <Snackbar
        open={failedSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setFailedSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setFailedSnackbarOpen(false)} severity='error'>
          Payout failed!
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default AdminWithdrawRequests
