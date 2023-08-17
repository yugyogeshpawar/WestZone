import React, { useState } from 'react';
import { Typography, Button, IconButton, Card, CardContent, Snackbar, Grid, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QRCode from 'qrcode.react';
import { useTheme, useMediaQuery } from '@mui/material';
import useAuth from 'src/@core/hooks/useAuth';
import Alert from '@mui/material/Alert';


const InvitationPage = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const invitationCode = user.username;
  const invitationLink = `www.westzone.store/auth/register/?ref=${user.username}`;

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopyLink = () => {
    // First try to use the modern Clipboard API
    if (navigator.clipboard) {
      navigator.clipboard.writeText(invitationLink)
        .then(() => {
          setSnackbarOpen(true);
        })
        .catch(err => {
          console.warn('Clipboard API failed:', err);
          fallbackCopyToClipboard();
        });
    } else {
      // Use fallback for older browsers
      fallbackCopyToClipboard();
    }
  };

  const fallbackCopyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = invitationLink;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setSnackbarOpen(true);
      } else {
        console.error('Fallback: Could not copy text.');
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  };


  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box padding={isMobileView ? '0px' : '16px'}>
      <Grid container spacing={3}>
        <IconButton onClick={() => window.history.back()} aria-label='Back'>
          <ArrowBackIcon />
        </IconButton>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                  <Typography variant='h4'>Invitation Page</Typography>
                </Grid>

                <Grid item xs={12} align="center">
                  <Typography variant='body1'>Invitation Code: {invitationCode}</Typography>
                </Grid>

                <Grid item xs={12} align="center">
                  <Box width={{ xs: '80%', md: '250px' }}>
                    <QRCode value={invitationLink} size={240} />
                  </Box>
                </Grid>

                <Grid item xs={12} align="center">
                  <Typography variant='body1'>Invitation Link: {invitationLink}</Typography>
                </Grid>

                <Grid item xs={12} align="center">
                  <Button variant='contained' color='primary' onClick={handleCopyLink}>
                    Copy Invitation Link
                  </Button>
                </Grid>

                <Grid item xs={12} align="center">
                  <Typography variant='body2'>
                    Tips: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ultricies nunc.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity='success' variant='filled'>
            Invitation link copied to clipboard!
          </Alert>
        </Snackbar>
      />
    </Box>
  );
};

export default InvitationPage;
