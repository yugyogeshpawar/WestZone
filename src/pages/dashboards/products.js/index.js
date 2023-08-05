import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@mui/material';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('An error occurred while fetching the products', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Link href={`/product/${product._id}`} passHref>
              <CardActionArea>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image} // Assuming you have an 'image' field in your product
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ textTransform: 'capitalize' }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                      {product.description}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      ₹ {product.price}.00
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Term: {product.term} days
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Daily Income: ₹ {product.dailyIncome}.00
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Revenue: ₹ {product.totalRevenue}.00
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Products;
