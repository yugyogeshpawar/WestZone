import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Rating,
  Chip,
  CardActions,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material'
import Timer from './Timer' // Adjust the path based on your directory structure

function Products() {
  const [products, setProducts] = useState([])

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        console.log(data)
        setProducts(data)
      } catch (error) {
        console.error('An error occurred while fetching the products', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom component='div' sx={{ paddingBottom: '8px' }}>
        Products
      </Typography>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={6} sm={6} md={3} key={product._id}>
            <Card sx={{ maxWidth: 345, margin: 'auto', padding: '8px', position: 'relative' }}>
              <CardMedia component='img' maxWidth='285px' image={product.image} alt={product.name} />
              {product.quantity == 0 ? (
                <Chip
                  label='Out of Stock'
                  color='secondary'
                  sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    zIndex: 1 // Ensure the Chip is displayed on top
                  }}
                />
              ) : (
                <Chip
                  label='In Stock'
                  color='primary'
                  sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    zIndex: 1 // Ensure the Chip is displayed on top
                  }}
                />
              )}
              <CardContent sx={{ padding: '8px' }}>
                <Typography gutterBottom variant={isMobile ? 'h6' : 'h5'} component='div'>
                  {product.name}
                </Typography>
                <Typography variant={isMobile ? 'body2' : 'body1'} color='text.primary'>
                  ₹ {product.price}.00
                </Typography>
                <Chip label={`Term: ${product.term} days`} variant='outlined' sx={{ mr: 1, mt: 1 }} />
                <Typography variant='body2' color='text.secondary'>
                  Daily Income: ₹ {product.dailyIncome}.00
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Days: {product.term}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Total Revenue: ₹ {product.totalRevenue}.00
                </Typography>
              </CardContent>
              <CardActions sx={{ padding: '8px' }}>
                <Link href={`/dashboards/products/${product._id}`} passHref sx={{ width: '100%' }}>
                  <Button variant='contained' size='small' color='primary'>
                    View Product
                  </Button>
                </Link>
              </CardActions>
              {product.timer && new Date(product.timer) > new Date() && <Timer targetDate={product.timer} />}
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Products
