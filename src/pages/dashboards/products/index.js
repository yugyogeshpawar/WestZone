import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Rating, Chip, CardActions, Button } from '@mui/material'

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error('An error occurred while fetching the products', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <Typography variant="h4" gutterBottom component="div">
        Products
      </Typography>
      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component='img'
                height='260'
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {product.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {product.description}
                </Typography>
                <Rating name="product-rating" defaultValue={product.rating} precision={0.5} readOnly />
                <Typography variant='body1' color='text.primary'>
                  ₹ {product.price}.00
                </Typography>
                <Chip label={`Term: ${product.term} days`} variant="outlined" sx={{ mr: 1, mt: 1 }} />
                <Typography variant='body2' color='text.secondary'>
                  Daily Income: ₹ {product.dailyIncome}.00
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Total Revenue: ₹ {product.totalRevenue}.00
                </Typography>
              </CardContent>
              <CardActions>
                <Link href={`/dashboards/products/${product._id}`} passHref sx={{ width:'100%' }}>
                  <Button variant='contained' size="small" color="primary">
                    View Product
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Products
