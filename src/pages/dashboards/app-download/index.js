import React from 'react'
import { Typography, Card, CardContent, Button, Rating, Box, Avatar, Grid } from '@mui/material'
import SafetyIcon from '@mui/icons-material/Shield'
import { useTheme, useMediaQuery } from '@mui/material'

const AppDownloadPage = () => {
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div style={{ padding: isMobileView ? '0px' : '16px' }}>
      {/* App Image */}
      <img src='/images/logo/logo.png' alt='App' style={{ width: '100%', maxWidth: '60px', height: 'auto' }} />

      {/* App Title */}
      <Typography variant='h4'>App Name</Typography>

      {/* App Subtitle */}
      <Typography variant='subtitle1'>App Description Lorem ipsum dolor sit amet...</Typography>

      {/* Free Download Button */}
      <Button variant='contained' color='primary' size='large' style={{ marginTop: '16px' }}>
        Free Download
      </Button>

      {/* Safety Certification */}
      <Box display='flex' alignItems='center' mt={2}>
        <SafetyIcon color='primary' />
        <Typography variant='body2' style={{ marginLeft: '8px' }}>
          Safety Certification Text
        </Typography>
      </Box>

      {/* Ratings and Reviews */}
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box display='flex' alignItems='center'>
              <Rating name='app-rating' value={4.5} precision={0.5} readOnly />
              <Typography variant='body2' style={{ marginLeft: '8px' }}>
                4.5 (12345)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant='contained' color='secondary'>
              Rate and Review
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Information Section */}
      <Card variant='outlined' style={{ marginTop: '16px' }}>
        <CardContent>
          <Typography variant='h6'>Additional Information</Typography>
          <Box mt={2}>
            {/* Replace the text with actual app information */}
            <Typography variant='body2'>
              Version: 1.0.0
              <br />
              Size: 30 MB
              <br />
              Updated: July 29, 2023
              <br />
              Developer: Your Company
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default AppDownloadPage
