// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import DailyIncome from 'src/pages/income-tabs/daily-Income'
import RechargeHistory from 'src/pages/income-tabs/recharge-history'
import OwnProducts from 'src/pages/income-tabs/own-products'
import ReferralIncome from 'src/pages/income-tabs/referral-income'
import WithdrawHistory from 'src/pages/income-tabs/withdraw-history'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState('buyProduct')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='buyProduct'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>own Products</TabName>
              </Box>
            }
          />
          <Tab
            value='dailyIncome'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>daily income</TabName>
              </Box>
            }
          />
          <Tab
            value='referralIncome'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Referral Income</TabName>
              </Box>
            }
          />
          <Tab
            value='withdrawHistory'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Withdraw history</TabName>
              </Box>
            }
          />
          <Tab
            value='rechargeHistory'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Recharge history</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='buyProduct'>
          <OwnProducts />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='dailyIncome'>
          <DailyIncome />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='referralIncome'>
          <ReferralIncome />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='withdrawHistory'>
          <WithdrawHistory />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='rechargeHistory'>
          <RechargeHistory />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AccountSettings
