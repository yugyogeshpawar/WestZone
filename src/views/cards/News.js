// pages/news.js

import React from 'react'
import { useTheme, useMediaQuery } from '@mui/material'
import { Typography, Card, CardContent } from '@mui/material'

const News = () => {
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))

  const newsList = [
    {
      id: 1,
      title: 'Lorem Ipsum News 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2023-07-29',
      imageSrc: '/images/news/news.jpg'
    }
  ]

  return (
    <div style={{ padding: '16px 0px 5px 20px' }}>
      <Typography variant='h4'>News</Typography>

      {/* News Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobileView ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)',
          gap: '16px',
          marginTop: '16px'
        }}
      >
        {newsList.map(news => (
          <Card key={news.id}>
            <CardContent>
              {/* News Image */}
              <img
                src={news.imageSrc}
                alt='News'
                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', marginBottom: '8px' }}
              />

              {/* News Title */}
              <Typography variant={isMobileView ? 'body1' : 'h6'}>{news.title}</Typography>

              {/* News Description */}
              <Typography variant='body2' style={{ marginBottom: isMobileView ? '0px' : '16px' }}>
                {news.description}
              </Typography>

              {/* News Date */}
              <Typography variant='body2' style={{ color: '#888' }}>
                Date: {news.date}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default News
