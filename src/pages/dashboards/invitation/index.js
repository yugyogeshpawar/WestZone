import React, { useState } from 'react'
import { Typography, Button, IconButton, Card, CardContent, Snackbar } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import QRCode from 'qrcode.react'
import { useTheme, useMediaQuery } from '@mui/material'

const InvitationPage = () => {
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))
  const invitationCode = 'ABC123'
  const invitationLink = 'https://example.com/invitation'

  // State for showing the snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleCopyLink = () => {
    // Implement the logic to copy the invitation link to the clipboard
    // For demonstration purposes, we'll just show the snackbar when the button is clicked
    setSnackbarOpen(true)
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <div style={{ padding: isMobileView ? '0px' : '16px' }}>
      {/* Back Button (Hidden in Desktop View) */}
      <IconButton className='back-button' onClick={() => window.history.back()} aria-label='Back'>
        <ArrowBackIcon />
      </IconButton>

      {/* Invitation Card */}
      <Card style={{ margin: '16px 0' }}>
        <CardContent>
          {/* Invitation Title */}
          <Typography variant='h4'>Invitation Page</Typography>

          {/* Invitation Code */}
          <Typography variant='body1'>Invitation Code: {invitationCode}</Typography>

          {/* QR Code Container */}
          <div
            style={{
              textAlign: 'center',
              margin: '16px 0',
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <div style={{ maxWidth: '100%', width: '250px' }}>
              <QRCode value={invitationLink} size={240} />
            </div>
          </div>

          {/* Invitation Link */}
          <Typography variant='body1'>Invitation Link: {invitationLink}</Typography>

          {/* Copy Invitation Link Button */}
          <Button style={{ marginTop: '16px' }} variant='contained' color='primary' onClick={handleCopyLink}>
            Copy Invitation Link
          </Button>

          {/* Tips */}
          <Typography variant='body2'>
            Tips: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ultricies nunc.
          </Typography>
        </CardContent>
      </Card>

      {/* Snackbar for Link Copied */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message='Invitation link copied to clipboard!'
        style={{ background: 'green', color: '#ffffff' }} // Customize background and text color
      />
    </div>
  )
}

export default InvitationPage
