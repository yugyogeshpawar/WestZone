import React, { useState } from 'react'
import { useTheme, useMediaQuery } from '@mui/material';
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

const MyTeam = () => {

  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  // Sample data for tables (you can replace this with your actual data)
  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Manager' },
    { id: 2, name: 'Jane Smith', role: 'Developer' }
  ]

  const teamLeads = [
    { id: 1, name: 'Michael Johnson', role: 'Team Lead' }
  ]

  const interns = [
    { id: 1, name: 'Emily Brown', role: 'Intern' }
  ]

  // State for the active tab
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <div style={{ padding: isMobileView ? '0px' : '16px' }}>
      {/* Page Title */}
      <Typography variant='h4'>My Team</Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label='Team Members' />
          <Tab label='Team Leads' />
          <Tab label='Interns' />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={activeTab} index={0}>
        {/* Table for Team Members */}
        <TableContainer component={Paper} sx={{ margin: { xs: '8px 0', sm: '16px 0' } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamMembers.map(member => (
                <TableRow key={member.id}>
                  <TableCell>{member.id}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        {/* Table for Team Leads */}
        <TableContainer component={Paper} sx={{ margin: { xs: '8px 0', sm: '16px 0' } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamLeads.map(lead => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.id}</TableCell>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        {/* Table for Interns */}
        <TableContainer component={Paper} sx={{ margin: { xs: '8px 0', sm: '16px 0' } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interns.map(intern => (
                <TableRow key={intern.id}>
                  <TableCell>{intern.id}</TableCell>
                  <TableCell>{intern.name}</TableCell>
                  <TableCell>{intern.role}</TableCell>
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
