import { useState, useEffect } from 'react'
import {
  Button,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Modal,
  Box,
  TextField,
  Snackbar,
  Grid,
  useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import MuiAlert from '@mui/material/Alert'

function AdminProduct() {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')

  const [editingProduct, setEditingProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    term: '',
    dailyIncome: '',
    totalRevenue: '',
    paragraph1: '',
    paragraph2: '',
    paragraph3: '',
    paragraph4: '',
    paragraph5: ''
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        showMessage('error', 'An error occurred while fetching the products')
      }
    }

    fetchProducts()
  }, [])

  const handleEditClick = product => {
    setEditingProduct(product)
    setModalOpen(true)
  }

  const handleImageChange = e => {
    const { name, value } = e.target;
    setEditingProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  }

  const handleEditChange = e => {
    const { name, value } = e.target
    setEditingProduct(prevProduct => ({ ...prevProduct, [name]: value }))
  }

  const handleEditSubmit = async e => {
    e.preventDefault()

    try {
      const res = await fetch(`/api/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingProduct)
      })
      const data = await res.json()

      if (data.error) {
        showMessage('error', `Error: ${data.error}`)
      } else {
        showMessage('success', data.message)
        setProducts(products.map(product => (product._id === editingProduct._id ? editingProduct : product)))
        setModalOpen(false)
      }
    } catch (error) {
      showMessage('error', 'An error occurred while deleting the product')
    }
  }

  const handleDelete = async id => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.error) {
        showMessage('error', `Error: ${data.error}`)
      } else {
        showMessage('success', data.message)
        setProducts(products.filter(product => product._id !== id))
      }
    } catch (error) {
      showMessage('error', 'An error occurred while deleting the product')
    }
  }

  const showMessage = (severity, message) => {
    setSnackbarSeverity(severity)
    setMessage(message)
    setSnackbarOpen(true)
  }

  return (
    <Container component='main' >
      <Box mt={4} mb={2}>
        <Typography variant='h4' component='h1' align='center'>Manage Products</Typography>
      </Box>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Box border={1} borderColor="divider" borderRadius={2} p={2} height="100%" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography variant='h6'>{product.name}</Typography>
              <Typography variant='body1'>{product.description}</Typography>
              <Typography variant='body1'>₹ {product.price}.00</Typography>
              <Typography variant='body1'>{product.term}</Typography>
              <Typography variant='body1'>₹ {product.dailyIncome}.00</Typography>
              <Typography variant='body1'>₹ {product.totalRevenue}.00</Typography>
              <Box mt={2}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button onClick={() => handleEditClick(product)} variant='contained' color='primary' fullWidth>
                      Edit
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button onClick={() => handleDelete(product._id)} variant='contained' color='error' fullWidth>
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            width: { xs: '90%', sm: 'auto' },
            maxHeight: '80vh', // set max height to 80% of the viewport height
            overflowY: 'auto', // make it scrollable
            p: 4
          }}
        >
          <Typography variant='h6' component='h2'>
            Edit Product
          </Typography>
          <form onSubmit={handleEditSubmit}>
            <TextField
              label='Name'
              name='name'
              value={editingProduct?.name || ''}
              onChange={handleEditChange}
              fullWidth
              required
              sx={{ marginTop: '8px' }}
            />
            <TextField
              label='Description'
              name='description'
              value={editingProduct?.description || ''}
              onChange={handleEditChange}
              fullWidth
              required
              multiline
              rows={4}
              sx={{ marginTop: '8px' }}
            />
            <TextField
              label='Image URL'
              name='image'
              value={editingProduct?.image || ''}
              onChange={handleImageChange}
              fullWidth
              sx={{ marginTop: '8px' }}
            />
            <TextField
              label='Price'
              name='price'
              type='number'
              value={editingProduct?.price || ''}
              onChange={handleEditChange}
              fullWidth
              required
              sx={{ marginTop: '8px' }}
            />
            <TextField
              label='Term'
              name='term'
              value={editingProduct?.term || ''}
              onChange={handleEditChange}
              fullWidth
              sx={{ marginTop: '8px' }}
            />
            <TextField
              label='Daily Income'
              name='dailyIncome'
              type='number'
              value={editingProduct?.dailyIncome || ''}
              onChange={handleEditChange}
              fullWidth
              sx={{ marginTop: '8px' }}
            />
            <TextField
              label='Total Revenue'
              name='totalRevenue'
              type='number'
              value={editingProduct?.totalRevenue || ''}
              onChange={handleEditChange}
              fullWidth
              sx={{ marginTop: '8px' }}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              rows={4}
              label='Paragraph 1'
              name='paragraph1'
              value={editingProduct?.paragraph1 || ''}
              onChange={handleEditChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              rows={4}
              label='Paragraph 2'
              name='paragraph2'
              value={editingProduct?.paragraph2 || ''}
              onChange={handleEditChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              rows={4}
              label='Paragraph 3'
              name='paragraph3'
              value={editingProduct?.paragraph3 || ''}
              onChange={handleEditChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              rows={4}
              label='Paragraph 4'
              name='paragraph4'
              value={editingProduct?.paragraph4 || ''}
              onChange={handleEditChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              rows={4}
              label='Paragraph 5'
              name='paragraph5'
              value={editingProduct?.paragraph5 || ''}
              onChange={handleEditChange}
            />
            <Button type='submit' variant='contained' color='primary' fullWidth>
              Save
            </Button>
          </form>
        </Box>
      </Modal>
      {message && <p>{message}</p>}

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert elevation={6} variant='filled' severity={snackbarSeverity}>
          {message}
        </MuiAlert>
      </Snackbar>
    </Container>
  )
}

export default AdminProduct
