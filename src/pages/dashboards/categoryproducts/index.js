/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import {
  useTheme,
  Link,
  useMediaQuery,
  Typography,
  Tab,
  Tabs,
  Grid,
  Card,
  Chip,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box
} from '@mui/material'

import Timer from './Timer'

function Products() {
  const [productsByCategory, setProductsByCategory] = useState({
    Authentication: [],
    'NA-Market': [],
    'Super-Series': []
  })
  const [activeTab, setActiveTab] = useState(0)
  const productCategories = ['Authentication', 'NA-Market', 'Super-Series']
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    async function fetchData() {
      const category = productCategories[activeTab]

      // Check if products for this category are already fetched
      if (productsByCategory[category].length > 0) return

      try {
        const res = await fetch(`/api/products?category=${category}`)
        const data = await res.json()
        console.log(data)

        // Update the state with the fetched products for the active category
        setProductsByCategory(prevState => ({
          ...prevState,
          [category]: data
        }))
      } catch (error) {
        console.error('An error occurred while fetching the products', error)
      }
    }

    fetchData()
  }, [activeTab])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const products = productsByCategory[productCategories[activeTab]]

  return (
    <div>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        {productCategories.map((category, index) => (
          <Tab key={index} label={category} sx={{ padding: '5px' }} />
        ))}
      </Tabs>

      <Grid container spacing={2} mt={2}>
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
                    color: 'white',
                    backgroundColor: '#f33131',
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
                    backgroundColor: '#4dc14d',
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
                  <Button variant='contained' size='small' color='primary' disabled={product.quantity == 0}>
                    View Products
                  </Button>
                </Link>
              </CardActions>
              <Box>{product.timer && new Date(product.timer) > new Date() && <Timer targetDate={product.timer} />}</Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Products
