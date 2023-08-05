import { useContext, useEffect } from 'react'
import { AuthProvider, AuthContext } from 'src/@core/context/JWTContext';
import LoadingScreen from 'src/@core/components/LoadingScreen';
import useAuth from 'src/@core/hooks/useAuth';


// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Box from '@mui/material/Box'
import IntroVideo from 'src/views/dashboard/IntroVideo'
import SimpleCard from 'src/views/cards/SimpleCard'
import News from 'src/views/cards/News'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import HandshakeIcon from '@mui/icons-material/Handshake'
import Diversity1Icon from '@mui/icons-material/Diversity1'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import FactCheckIcon from '@mui/icons-material/FactCheck'

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))



const Dashboard = () => {
  const { user } = useAuth();
  const authContext = useContext(AuthContext)
  if (!authContext.isInitialized || !authContext.isAuthenticated) {
    return <LoadingScreen />; // Replace with your loading component
  }


  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <IntroVideo />
        </Grid>
        <Grid item md={8} xs={12}>
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'action.hover',
              padding: theme => `${theme.spacing(18, 5, 16)} !important`
            }}
          >
            <Box>
              <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Typography variant='h6'>₹</Typography>
                <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '3.75rem !important' }}>
                  {user.walletBalance}
                </Typography>
                <Typography variant='h6'>Rupee</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Button variant='contained'>Recharge</Button>
                <Button variant='contained' sx={{ ml: 2 }}>
                  Withdraw
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Grid>
        <Grid item xs={12} sx={{ maxheight: '2px', padding: '0px !important' }}></Grid>

        <Grid item xs={4} md={3}>
          <SimpleCard title='Gift Reception' icon={CardGiftcardIcon} link='/dashboards/gifts' />
        </Grid>
        <Grid item xs={4} md={3}>
          <SimpleCard title='Invitation' icon={HandshakeIcon} link='/dashboards/invitation' />
        </Grid>
        <Grid item xs={4} md={3}>
          <SimpleCard title='My Teams' icon={Diversity1Icon} link='/dashboards/myteam' />
        </Grid>
        <Grid item xs={4} md={3}>
          <SimpleCard title='My Projects' icon={AccountTreeIcon} link='/dashboards/my-projects' />
        </Grid>
        <Grid item xs={4} md={3}>
          <SimpleCard title='Customer service' icon={SupportAgentIcon} link='/dashboards/customer-services' />
        </Grid>
        <Grid item xs={4} md={3}>
          <SimpleCard title='APP Download' icon={CloudDownloadIcon} link='/dashboards/app-download' />
        </Grid>
        <Grid item xs={4} md={3}>
          <SimpleCard title='Money making' icon={RequestQuoteIcon} link='/dashboards/money-making' />
        </Grid>
        <Grid item xs={4} md={3}>
          <SimpleCard title='Check Ins' icon={FactCheckIcon} link='/dashboards/check-ins' />
        </Grid>

        <Grid>
          <News />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard