import { useState, useEffect } from 'react'
import { Typography, Box, LinearProgress } from '@mui/material'

function Timer({ targetDate }) {
  const target = new Date(targetDate).getTime() // Convert to milliseconds

  const calculateTimeLeft = () => {
    const now = new Date().getTime()

    return target - now
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    if (timeLeft <= 0) return

    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft])

  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant='body2' align='center'>
        Sale end in {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Typography>
      <LinearProgress variant='determinate' value={(timeLeft / (24 * 60 * 60 * 1000)) * 100} />
    </Box>
  )
}

export default Timer
