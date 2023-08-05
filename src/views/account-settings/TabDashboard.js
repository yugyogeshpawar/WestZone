import { Box, IconButton, Typography, Grid, Paper, Button } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import FunctionIcon from '@mui/icons-material/Settings' // This is a placeholder icon, replace with the icons you want

// Dummy data
const data = [
  { title: 'Data 1', value: 48.02 },
  { title: 'Data 2', value: 36.94 },
  { title: 'Data 3', value: 52.32 },
  { title: 'Data 4', value: 21.67 },
  { title: 'Data 5', value: 85.32 },
  { title: 'Data 6', value: 47.98 }
]

const data2 = [
  { title: 'Data 1', value: 48.02 },
  { title: 'Data 2', value: 36.94 },
  { title: 'Data 3', value: 52.32 }
]

const commonFunctions = [
  { title: 'Func 1', icon: <FunctionIcon /> },
  { title: 'Func 2', icon: <FunctionIcon /> },
  { title: 'Func 3', icon: <FunctionIcon /> },
  { title: 'Func 4', icon: <FunctionIcon /> },
  { title: 'Func 5', icon: <FunctionIcon /> },
  { title: 'Func 6', icon: <FunctionIcon /> },
  { title: 'Func 7', icon: <FunctionIcon /> },
  { title: 'Func 8', icon: <FunctionIcon /> },
  { title: 'Func 9', icon: <FunctionIcon /> }
]

const TabDashboard = () => {
  return (
    <Box
      sx={{
        p: { xs: 1, md: 2 },
        '.MuiPaper-root': {
          p: { xs: 1, md: 2 },
          borderRadius: 1, // Rounded corners
          bgcolor: 'background.paper', // change color based on the theme
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          textAlign: 'center'
        },
        '.MuiTypography-root': {
          color: 'text.primary' // change color based on the theme
        }
      }}
    >
      <Box
        sx={{
          position: 'relative', // To position the IconButton
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Typography align='center'>
          <img src='/images/logo/logo.png' alt='Logo' style={{ maxWidth: '60px' }} />
        </Typography>

        <IconButton
          color='primary'
          sx={{ position: 'absolute', top: '10px', right: '10px' }} // Adjust according to your needs
        >
          <SettingsIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Paper elevation={1}>
              <Typography variant='body2' sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                {item.title}
              </Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem' }}>
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 5 }}>
        {data2.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Paper elevation={1}>
              <Typography variant='body2' sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                {item.title}
              </Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem' }}>
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
        <Box sx={{ justifyContent: 'center', display: 'flex', width: '100%', padding: 4 }}>
          <Button variant='contained' color='primary' sx={{ mt: 2 }}>
            Team Connections
          </Button>
        </Box>
      </Grid>

      <Typography variant='h6' align='center' sx={{ mt: 5, mb: 2 }}>
        Common Functions
      </Typography>

      <Grid container spacing={2}>
        {commonFunctions.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Paper
              elevation={1}
              sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
            >
              {item.icon}
              <Typography variant='body2' sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                {item.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default TabDashboard
