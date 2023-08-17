import { Container, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'

export default function ComingSoon() {
  return (
    <Container maxWidth='lg' style={{ height:'100%', position: 'relative' }}>
      {/* <Image src='/images/sample.jpg' alt='Background image' layout='fill' objectFit='cover' quality={100} /> */}
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        height='100%'
        backdropFilter='blur(4px)'
        
        // sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <Typography variant='h2' color='primary' align='center'>
          Crypto Project
        </Typography>
        <Typography variant='h4' color='secondary' align='center' gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant='body1' color='textSecondary' align='center' paragraph>
          Join our mailing list and be the first to know about our exciting new crypto project.
        </Typography>
        <Button variant='contained' color='primary'>
          Subscribe
        </Button>
      </Box>
    </Container>
  )
}
