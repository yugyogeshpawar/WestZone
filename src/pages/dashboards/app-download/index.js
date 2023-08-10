import React from 'react'
import { Typography, Card, CardContent, Button, Rating, Box, Grid, TextField, Paper } from '@mui/material'
import SafetyIcon from '@mui/icons-material/Shield'
import ShareIcon from '@mui/icons-material/Share'
import { useTheme, useMediaQuery } from '@mui/material'

const AppDownloadPage = () => {
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Paper style={{ padding: isMobileView ? '6px' : '16px', borderRadius: '8px' }}>
      {/* App Image */}
      <div style={{ display: 'flex', width: 'fit-content', boxShadow: '0px 0px 2px #aaaaaa', borderRadius: '14px', marginBottom: '10px' }}>
        <img src='/images/logo/logo_small.png' alt='App' style={{ width: '100%', maxWidth: '60px', height: 'auto' }} />
      </div>
      {/* App Title */}
      <Typography variant='h4' color="textPrimary">Westzone</Typography>

      {/* App Subtitle */}
      <Typography variant='subtitle1' color="textSecondary">Contains ads In-app purchases</Typography>

      <Box mt={4} display='flex' justifyContent='space-between' alignItems='center'>
        <Button
          variant='contained'
          startIcon={<ShareIcon />}
          onClick={() => {
            // Logic to share the app (e.g., using the Web Share API or a library)
          }}
        >
          Share
        </Button>
      </Box>

      {/* Coming Soon Message */}
      <Typography variant='h5' style={{ marginTop: '16px', color: theme.palette.primary.main }}>
        Coming Soon!
      </Typography>

      {/* Optional: Email Subscription for Notification */}
      <Box mt={2}>
        <Typography variant='body2' color="textSecondary">Get notified when the app is available:</Typography>
        <Box display='flex' alignItems='center' mt={1}>
          <TextField variant='outlined' label='Your Email' size='small' style={{ flexGrow: 1 }} />
          <Button variant='contained' color='primary' style={{ marginLeft: '8px' }}>
            Subscribe
          </Button>
        </Box>
      </Box>

      {/* Safety Certification */}
      <Box display='flex' alignItems='center' mt={2}>
        <SafetyIcon color='primary' />
        <Typography variant='body2' color="textSecondary" style={{ marginLeft: '8px' }}>
          Safety Certification
        </Typography>
      </Box>

      {/* Ratings and Reviews */}
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box display='flex' alignItems='center'>
              <Rating name='app-rating' value={4.5} precision={0.5} readOnly />
              <Typography variant='body2' color="textSecondary" style={{ marginLeft: '8px' }}>
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
          <Typography variant='h6' color="textPrimary">Additional Information</Typography>
          <Box mt={2}>
            {/* Replace the text with actual app information */}
            <Typography variant='body2' color="textSecondary">
              Version: 1.0.0
              <br />
              Size: 30 MB
              <br />
              Expected Release: 14-Aug-2023
              <br />
              Development: Westzone pvt. ltd.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Paper>
  )
}

export default AppDownloadPage
