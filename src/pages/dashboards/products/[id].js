import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import useAuth from 'src/@core/hooks/useAuth'
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Rating,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowBack from '@mui/icons-material/ArrowBack'



const ProductImage = styled('img')({
  maxWidth: '100%',
  height: 'auto'
})

const ProductPage = () => {
  const theme = useTheme();
  const router = useRouter()
  const { id } = router.query
  const { user } = useAuth()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
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
        console.log(response.data)
        setLoading(false)
      }

      fetchData()
    }
  }, [id])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const goBack = () => {
    router.back()
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
      <IconButton onClick={goBack} sx={{ mb: 2 }}>
        <ArrowBack />
      </IconButton>
      <Typography variant='h4' gutterBottom>
        Product Overview
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <ProductImage src={product.image} alt={product.name} style={{ objectFit: 'contain' }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <Box>
                  <Typography gutterBottom variant='h5' component='div'>
                    {product.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {product.description}
                  </Typography>
                  <Rating name="product-rating" defaultValue={5} precision={0.5} readOnly />
                  <Typography variant='body2' color='text.secondary'>
                    <strong>Price: </strong> ₹{product.price}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    <strong>Daily Income: </strong> {product.term_dailyIncome}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    <strong>Total Revenue: </strong> {product.totalRevenue}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {product.paragraph1 && product.paragraph1}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {product.paragraph2 && product.paragraph2}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {product.paragraph3 && product.paragraph3}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {product.paragraph4 && product.paragraph4}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {product.paragraph5 && product.paragraph5}
                  </Typography>
                </Box>
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
                    <DialogContentText id='alert-dialog-description' mt={2}>
                      Your Balance is <strong> ₹{parseFloat(user.walletBalance).toFixed(2)}</strong>
                    </DialogContentText>
                    <DialogContentText id='alert-dialog-description'>
                      This Product Price is <strong> ₹{product.price}.00 </strong>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm} autoFocus variant='contained'>
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={6000}
                  onClose={handleSnackbarClose}
                  anchorOrigin={{ vertical: isMobileView ? 'bottom' : 'top', horizontal: 'right' }}
                >
                  <Alert onClose={handleSnackbarClose} variant='filled' severity={snackbarType} sx={{ width: '100%' }}>
                    {snackbarMessage}
                  </Alert>
                </Snackbar>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default ProductPage
