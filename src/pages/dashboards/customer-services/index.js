import React, { useState } from 'react';
import { Button, TextField, Typography, Container, useTheme, useMediaQuery, Paper } from '@mui/material';

const SupportPage = () => {
  const [message, setMessage] = useState('');
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = () => {
    // Handle the support request submission logic here
    console.log(`Support message: ${message}`);
  };

  return (
    <Container maxWidth="sm" style={{ padding: isMobileView ? '16px' : '32px' }}>
      <Typography variant={isMobileView ? 'h5' : 'h4'} gutterBottom>
        Support
      </Typography>
      <Typography variant={isMobileView ? 'body2' : 'body1'} gutterBottom>
        If you have any questions or issues, please describe them below and we'll get back to you as soon as possible.
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Your Message"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ margin: '16px 0' }}
        InputProps={{
          style: {
            fontSize: isMobileView ? '0.8rem' : '1rem',
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        style={{ fontSize: isMobileView ? '0.8rem' : '1rem', marginBottom: '32px' }}
      >
        Submit
      </Button>

      {/* Additional Support Information */}
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant={isMobileView ? 'h6' : 'h5'} gutterBottom>
          Need Immediate Assistance?
        </Typography>
        <Typography variant={isMobileView ? 'body2' : 'body1'}>
          Call our support hotline at: <strong>+1-800-123-4567</strong>
        </Typography>
        <Typography variant={isMobileView ? 'body2' : 'body1'} style={{ marginTop: '16px' }}>
          Or email us at: <strong>support@westzone.store</strong>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SupportPage;
