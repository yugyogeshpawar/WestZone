import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { Box, Button, TextField, Typography, Card, CardContent, Snackbar, Alert } from '@mui/material'
import { styled } from '@mui/material/styles'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const VerifyOtpCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const VerifyOtpPage = () => {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('error')

  const userId = router.query.userId

  const handleOtpChange = e => {
    setOtp(e.target.value)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const handleVerifyOtp = async e => {
    e.preventDefault()

    if (!otp || otp.length !== 6) {
      setSnackbarMessage('Please enter a 6-digit OTP.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
      
      return
    }

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          otp
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        setSnackbarMessage(errorData.message || 'OTP verification failed')
        setSnackbarSeverity('error')
        setSnackbarOpen(true)

        return
      }

      setSnackbarMessage('OTP verified successfully!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      router.push('/dashboard') // Redirect to dashboard after successful OTP verification
    } catch (err) {
      setSnackbarMessage('An error occurred during OTP verification')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  return (
    <Box className='content-center'>
      <VerifyOtpCard sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Verify OTP
            </Typography>
            <Typography variant='body2'>Please enter the OTP sent to your registered email address.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleVerifyOtp}>
            <TextField
              fullWidth
              variant='outlined'
              required
              label='OTP'
              autoFocus
              value={otp}
              onChange={handleOtpChange}
              sx={{ marginBottom: 4 }}
            />
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }}>
              Verify
            </Button>
          </form>
          <Typography variant='body2' sx={{ textAlign: 'center', marginBottom: 2 }}>
            Already have an account? <Link href='/login'>Login</Link>
          </Typography>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            Don't have an account? <Link href='/register'>Register</Link>
          </Typography>
        </CardContent>
      </VerifyOtpCard>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

VerifyOtpPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default VerifyOtpPage
