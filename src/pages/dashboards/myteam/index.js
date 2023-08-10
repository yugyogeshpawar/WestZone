import React, { useState, useEffect } from 'react'
import { useTheme, useMediaQuery } from '@mui/material'
import {
  Typography,
  Tab,
  Tabs,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import axios from 'axios'


const MyTeam = () => {
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))


  // Sample data for tables (you can replace this with your actual data)
  const [teamMembers, setTeamMembers] = useState([]);
  const [inactiveMembers, setInactiveMembers] = useState([]);


  const directMembers = teamMembers.filter(member => member.level === 1);


  // State for the active tab
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    // Fetch team data from the API
    const fetchTeamData = async () => {
      const accessToken = window.localStorage.getItem('accessToken')

      if (accessToken) {
        const headers = { Authorization: `Bearer ${accessToken}` }

        try {
          const response = await axios.get('/api/list/myteam', { headers })
          console.log(response.data)

          if (response.data && response.data.teamMembers) {
            setTeamMembers(response.data.teamMembers);
          }

          // Fetch inactive members
          const inactiveResponse = await axios.get('/api/list/inactiveMember', { headers })
          console.log(inactiveResponse.data)

          if (inactiveResponse.data && inactiveResponse.data.inactiveMembers) {
            setInactiveMembers(inactiveResponse.data.inactiveMembers);
          }

        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
    }

    fetchTeamData()
  }, [])

  return (
    <div style={{ padding: isMobileView ? '0px' : '16px' }}>
      {/* Page Title */}
      <Typography variant='h4'>My Team</Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label='Team Members' />
          <Tab label='Direct Members' />
          <Tab label='Inactive Team Members' />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={activeTab} index={0}>
        {/* Table for Team Members */}
        <TableContainer component={Paper} sx={{ margin: { xs: '8px 0', sm: '16px 0' } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>Joining Date</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>Investment Amount</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>Total Earning</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamMembers.map((member, index) => (
                <TableRow key={member.id}>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{index + 1}</TableCell>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{member.username}</TableCell>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{formatDate(member.createdAt)}</TableCell>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{member.currentInvst}</TableCell>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{member.totalEarning}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        {/* Table for Direct Members */}
        <TableContainer component={Paper} sx={{ margin: { xs: '8px 0', sm: '16px 0' } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>Joining Date</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>Investment Amount</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>Total Earning</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {directMembers.map((member, index) => (
                <TableRow key={member.id}>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{index + 1}</TableCell>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{member.username}</TableCell>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{formatDate(member.createdAt)}</TableCell>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{member.currentInvst}</TableCell>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{member.totalEarning}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        {/* Table for Inactive Members */}
        <TableContainer component={Paper} sx={{ margin: { xs: '8px 0', sm: '16px 0' } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>Joining Date</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>Investment Amount</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>Total Earning</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inactiveMembers.map((member, index) => (
                <TableRow key={member.id}>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{index + 1}</TableCell>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{member.username}</TableCell>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{formatDate(member.createdAt)}</TableCell>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{member.topupAmt}</TableCell>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>{member.totalEarning}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

    </div>
  )
}

const TabPanel = props => {
  const { children, value, index, ...other } = props

  return (
    <div role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box p={{ xs: 1, sm: 3 }}>{children}</Box>}
    </div>
  )
}

export default MyTeam
