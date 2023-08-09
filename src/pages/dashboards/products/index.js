import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Rating, Chip, CardActions, Button, useTheme, useMediaQuery } from '@mui/material'

function Products() {
  const [products, setProducts] = useState([])

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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
      <Typography variant={isMobile ? "h5" : "h4"} gutterBottom component="div" sx={{ paddingBottom: '8px' }}>
        Products
      </Typography>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={6} sm={6} md={3} key={product._id}>
            <Card sx={{ maxWidth: 345, margin: 'auto', padding: '8px' }}>
              <CardMedia
                component='img'
                height='280'
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ padding: '8px' }}>
                <Typography gutterBottom variant={isMobile ? "h6" : "h5"} component='div'>
                  {product.name}
                </Typography>
                <Typography variant={isMobile ? "body2" : "body1"} color='text.primary'>
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
              <CardActions sx={{ padding: '8px' }}>
                <Link href={`/dashboards/products/${product._id}`} passHref sx={{ width: '100%' }}>
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
