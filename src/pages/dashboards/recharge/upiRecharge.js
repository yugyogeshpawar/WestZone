import React, { useState } from 'react'
import axios from 'axios'
import useAuth from 'src/@core/hooks/useAuth'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Grid,
  Link
} from '@mui/material'
import QRCode from 'qrcode.react'
import MobileDetect from 'mobile-detect'

const TopUpPageUPI = ({ open, onClose }) => {
  const { user } = useAuth()
  const [amount, setAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [qrValue, setQrValue] = useState(null)
  const [yourName, setYourName] = useState(null)

  const handleChange = event => {
    setAmount(event.target.value)
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    setQrValue(null)
  }

  const handleConfirm = async () => {
    setIsSubmitting(true)

    const data = {
      userName: user.username,
      amount: amount
    }

    const accessToken = window.localStorage.getItem('accessToken')

    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }

      const response = await axios.post('/api/payin', data, { headers: headers })
      setQrValue(response.data.qrValue)
      setYourName(response.data.yourName)
    } catch (error) {
      console.error('There was an error!', error)
    }

    setTimeout(() => {
      setIsSubmitting(false)
    }, 1000)
  }

  const createUpiLink = appName => {
    let upiLink = ''
    const merchantCode = '6012'
    const transactionReference = 'EZY2023082014160373026377'
    switch (appName) {
      case 'paytm':
        upiLink = `paytmmp://pay?pa=${qrValue}&pn=${yourName}&tr=${transactionReference}&cu=INR&mc=${merchantCode}&am=${amount}`
        break
      case 'googlePay':
        upiLink = `tez://upi/pay?pa=${qrValue}&pn=${yourName}&tr=${transactionReference}&cu=INR&mc=${merchantCode}&am=${amount}`
        break
      case 'phonePe':
        upiLink = `phonepe://pay?pa=${qrValue}&pn=${yourName}&tr=${transactionReference}&cu=INR&mc=${merchantCode}&am=${amount}`
        break
      case 'others':
        upiLink = `upi://pay?pa=${qrValue}&pn=${yourName}&tr=${transactionReference}&cu=INR&mc=${merchantCode}&am=${amount}`
        break
      default:
        break
    }

    return upiLink
  }

  const handleAppPayment = url => {
    const md = new MobileDetect(window.navigator.userAgent)
    if (md.mobile()) {
      window.location.href = url
    } else {
      alert('Please use a mobile device to make the payment using the app')
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Top-Up Wallet (UPI)</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='amount'
            label='Amount'
            type='number'
            fullWidth
            variant='standard'
            value={amount}
            onChange={handleChange}
          />
          {qrValue && (
            <Grid container direction='column' alignItems='center'>
              <Typography variant='h6'>Scan the QR code to pay</Typography>
              <QRCode value={qrValue} size={256} />
              <Typography variant='body1'>Or pay using</Typography>
              <Grid container spacing={2} justifyContent='center'>
                <Grid item>
                  <Button variant='outlined' onClick={() => handleAppPayment(createUpiLink('paytm'))}>
                    Paytm
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='outlined' onClick={() => handleAppPayment(createUpiLink('googlePay'))}>
                    Google Pay
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='outlined' onClick={() => handleAppPayment(createUpiLink('phonePe'))}>
                    PhonePe
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='outlined' onClick={() => handleAppPayment(createUpiLink('others'))}>
                    Others
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={isSubmitting} onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TopUpPageUPI

//href="upi://pay?pa=savingmulti@icici&pn=SavingMulti&tr=EZY2023082014160373026377&cu=INR&mc=6012&am=500"

//href="paytmmp://pay?pa=savingmulti@icici&pn=SavingMulti&tr=EZY2023082014160373026377&cu=INR&mc=6012&am=500"

//href="tez://upi/pay?pa=savingmulti@icici&pn=SavingMulti&tr=EZY2023082014160373026377&cu=INR&mc=6012&am=500"

//href="phonepe://pay?pa=savingmulti@icici&pn=SavingMulti&tr=EZY2023082014160373026377&cu=INR&mc=6012&am=500"
