import React, { useState } from 'react'
import { Typography, Button, IconButton, Card, CardContent, TextField } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const RedemptionPage = () => {
  // Sample redemption history (you can replace this with actual data)
  const [redemptionHistory, setRedemptionHistory] = useState([
    { id: 1, code: 'ABC123', date: '2023-07-01' },
    { id: 2, code: 'XYZ789', date: '2023-07-10' }
  ])

  // State for the input field value
  const [redemptionCode, setRedemptionCode] = useState('')

  const handleRedeem = () => {
    setRedemptionHistory(prevHistory => [
      ...prevHistory,
      { id: prevHistory.length + 1, code: redemptionCode, date: new Date().toISOString().split('T')[0] }
    ])
    setRedemptionCode('')
  }

  return (
    <div>
      <IconButton className='back-button' onClick={() => window.history.back()} aria-label='Back'>
        <ArrowBackIcon />
      </IconButton>

      {/* Redemption Card */}
      <Card style={{ margin: '16px 0' }}>
        <CardContent>
          <Typography variant='h4'>Redemption Page</Typography>
          <TextField
            label='Enter Redemption Code'
            variant='outlined'
            value={redemptionCode}
            onChange={e => setRedemptionCode(e.target.value)}
            style={{ marginTop: '16px', width: '100%' }}
          />
          <Button style={{ marginTop: '16px' }} variant='contained' color='primary' onClick={handleRedeem}>
            Redeem
          </Button>
        </CardContent>
      </Card>

      {/* Redemption History */}
      <Card style={{ margin: '16px 0' }}>
        <CardContent>
          {/* Redemption History Title */}
          <Typography variant='h5'>Redemption History</Typography>

          {/* Display the redemption history */}
          {redemptionHistory.map(item => (
            <div key={item.id} style={{ marginTop: '8px' }}>
              <Typography variant='body1'>Redemption Code: {item.code}</Typography>
              <Typography variant='body2'>Redemption Date: {item.date}</Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default RedemptionPage
