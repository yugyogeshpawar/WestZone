import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import useAuth from 'src/@core/hooks/useAuth'
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material'

const ProductPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { user } = useAuth()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('success')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await axios.get(`/api/products/${id}`)
        setProduct(response.data)
        setLoading(false)
      }

      fetchData()
    }
  }, [id])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const handleConfirm = async () => {
    const accessToken = window.localStorage.getItem('accessToken')
    try {
      const response = await axios.post(
        `/api/products/buyproduct/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      )
      if (response.status === 200) {
        setSnackbarType('success')
        setSnackbarMessage('Purchase confirmed')
        setSnackbarOpen(true)
        setOpen(false)
      }
    } catch (error) {
      setSnackbarType('error')
      setSnackbarMessage('Purchase failed')
      setSnackbarOpen(true)
      setOpen(false)
      console.error('Error during purchase:', error)
    }
  }

  return (
    <Box>
      <Typography variant='h2' gutterBottom>
        Product Overview
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Card sx={{ width: '100%', height: '100%' }}>
          <CardContent>
            <img component='img' height='140' src={product.image} alt={product.name} />
            <Typography gutterBottom variant='h5' component='div'>
              {product.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {product.description}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <strong>Price: </strong> ${product.price}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <strong>Daily Income: </strong> {product.term_dailyIncome}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <strong>Total Revenue: </strong> {product.totalRevenue}
            </Typography>
            <Button variant='contained' color='primary' onClick={handleClickOpen}>
              Buy Now
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>{'Confirm Purchase'}</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  Are you sure you want to purchase<strong> {product.name}?</strong>
                </DialogContentText>
                <DialogContentText id='alert-dialog-description'>
                  Your Balance is <strong> ₹{user.walletBalance}.00</strong>
                </DialogContentText>
                <DialogContentText id='alert-dialog-description'>
                  This Product Price is <strong> ₹{product.price}.00 </strong>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>

          <Snackbar
            open={snackbarOpen}
            sx={{ marginTop: '50px' }}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarType} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Card>
      )}
    </Box>
  )
}

export default ProductPage
