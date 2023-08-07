import React from 'react'
import { Typography } from '@mui/material'
import { useTheme, useMediaQuery } from '@mui/material'

// Import the JSON content
import moneyMakingContent from '../money_making_content.json'

const MoneyMakingPage = () => {
  const { title, description, images } = moneyMakingContent
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div style={{ padding: isMobileView ? '0px' : '16px' }}>
      {/* Title */}
      <Typography variant='h4'>{title}</Typography>

      {/* Description */}
      <Typography variant='body1'>{description}</Typography>

      {/* Images */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            style={{ width: '300px', height: '200px', objectFit: 'cover' }}
          />
        ))}
      </div>
    </div>
  )
}

export default MoneyMakingPage
