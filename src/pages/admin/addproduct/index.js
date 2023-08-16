import { useState, useEffect } from 'react'
import { TextField, Button, Typography, Container } from '@mui/material'
import { useRouter } from 'next/router'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';


function AdminProduct() {
  const router = useRouter()
  const { id } = router.query

  const [product, setProduct] = useState({
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
    paragraph5: '',
    category: ''
  })

  const categories = ['Authentication', 'NA-Market', 'Super-Series'];

  const [message, setMessage] = useState('')

  useEffect(() => {
    async function fetchProduct() {
      if (id) {
        try {
          const res = await fetch(`/api/products/${id}`)
          const data = await res.json()
          setProduct(data)
        } catch (error) {
          console.error('An error occurred while fetching the product', error)
        }
      }
    }

    fetchProduct()
  }, [id])

  const handleChange = e => {
    const { name, value } = e.target
    let updatedProduct = { ...product, [name]: value }

    if (name === 'term' || name === 'dailyIncome') {
      updatedProduct.totalRevenue = (
        parseFloat(updatedProduct.term || 0) * parseFloat(updatedProduct.dailyIncome || 0)
      ).toString()
    }

    setProduct(updatedProduct)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const method = id ? 'PUT' : 'POST'
    const url = id ? `/api/products/${id}` : '/api/products/addProduct'

    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })

    const data = await res.json()

    if (data.error) {
      setMessage(`Error: ${data.error}`)
    } else {
      setMessage(data.message)
      if (!id) {
        setProduct({
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
          paragraph5: '',
          category: ''
        })
      }
    }
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.error) {
        setMessage(`Error: ${data.error}`)
      } else {
        setMessage(data.message)
      }
    } catch (error) {
      console.error('An error occurred while deleting the product', error)
    }
  }

  return (
    <Container component='main' maxWidth='md'>
      <Typography variant='h4'>{id ? 'Edit' : 'Add'} a Product</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          label='Name'
          name='name'
          value={product.name}
          onChange={handleChange}
          required
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          multiline
          rows={4}
          label='Description'
          name='description'
          value={product.description}
          onChange={handleChange}
          required
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          label='Price'
          name='price'
          type='number'
          value={product.price}
          onChange={handleChange}
          required
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          label='Image URL'
          name='image'
          value={product.image}
          onChange={handleChange}
          required
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          label='Term (in days)'
          name='term'
          type='number'
          value={product.term}
          onChange={handleChange}
          required
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          label='Daily Income'
          name='dailyIncome'
          type='number'
          value={product.dailyIncome}
          onChange={handleChange}
          required
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          label='Total Revenue'
          name='totalRevenue'
          type='number'
          value={product.totalRevenue}
          onChange={handleChange}
          required
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          multiline
          rows={4}
          label='Paragraph 1'
          name='paragraph1'
          value={product.paragraph1}
          onChange={handleChange}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          multiline
          rows={4}
          label='Paragraph 2'
          name='paragraph2'
          value={product.paragraph2}
          onChange={handleChange}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          multiline
          rows={4}
          label='Paragraph 3'
          name='paragraph3'
          value={product.paragraph3}
          onChange={handleChange}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          multiline
          rows={4}
          label='Paragraph 4'
          name='paragraph4'
          value={product.paragraph4}
          onChange={handleChange}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          multiline
          rows={4}
          label='Paragraph 5'
          name='paragraph5'
          value={product.paragraph5}
          onChange={handleChange}
        />
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            label="Category"
            name="category"
            value={product.category || ''}
            onChange={handleChange}
            required
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type='submit' variant='contained' color='primary' fullWidth>
          Add Product
        </Button>
      </form>
      {id && (
        <div>
          <Button onClick={handleDelete} variant='contained' color='secondary'>
            Delete Product
          </Button>
        </div>
      )}
      {message && <p>{message}</p>}
    </Container>
  )
}

export default AdminProduct
