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
  Snackbar
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'

function AdminProduct() {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

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
    <Container component='main' maxWidth='md'>
      <Typography variant='h4'>Manage Products</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>₹ {product.price}.00</TableCell>
              <TableCell>
                <Button onClick={() => handleEditClick(product)} variant='contained' color='primary'>
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(product._id)} variant='contained' color='secondary'>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
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
            Edit Product``
          </Typography>
          <form onSubmit={handleEditSubmit}>
            <TextField
              label='Name'
              name='name'
              value={editingProduct?.name || ''}
              onChange={handleEditChange}
              fullWidth
              required
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
            />
            <TextField
              label='Price'
              name='price'
              type='number'
              value={editingProduct?.price || ''}
              onChange={handleEditChange}
              fullWidth
              required
            />
            {/* Add more TextFields for other product attributes here */}
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
