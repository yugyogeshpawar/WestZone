// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

const Trophy = () => {
  // ** Hook
  const theme = useTheme()

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
         <iframe
          width="100%"  // Set the width of the video player
          height="300" // Set the height of the video player
          src="https://www.youtube.com/embed/h8YE0e3j50A"
          title="YouTube video player" // Set an appropriate title for the video player
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </CardContent>
    </Card>
  )
}

export default Trophy
