import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Typography, IconButton, Card, CardContent, CardActions, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SubjectIcon from '@mui/icons-material/Subject'
import { useTheme, useMediaQuery } from '@mui/material'

const MyProjects = () => {
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))

  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      const accessToken = window.localStorage.getItem('accessToken')

      if (accessToken) {
        const headers = { Authorization: `Bearer ${accessToken}` }

        try {
          const response = await axios.get('/api/list/myproducts', { headers })
          if (response.data && response.data.products) {
            console.log(response.data.products)
            setProjects(response.data.products)
          }
        } catch (error) {
          console.error("Error fetching projects:", error)
        }
      }
    }

    fetchProjects()
  }, [])

  return (
    <div style={{ padding: isMobileView ? '0px' : '16px' }}>
      {/* Back Button */}
      <IconButton onClick={() => window.history.back()} style={{ padding: '0px', paddingBottom: '14px' }}>
        <ArrowBackIcon />
      </IconButton>

      {/* Page Title */}
      <Typography variant='h4'>My Projects</Typography>

      {/* Projects Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
        {projects.map(project => (
          <Card key={project.productId} sx={{ width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.33% - 16px)' } }}>
            <CardContent>
              {/* Project Icon and Subject */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <SubjectIcon />
                <Typography variant='subtitle1' style={{ marginLeft: '8px' }}>
                  {project.userName} {/* Assuming you want to display the user's name as the project subject */}
                </Typography>
              </div>

              {/* Project Description */}
              <Typography variant='body2' style={{ marginBottom: '8px' }}>
                Status: {project.status}
              </Typography>

              {/* Created At */}
              <Typography variant='body2' style={{ color: '#888' }}>
                Invested on: {new Date(project.dateTime).toLocaleDateString()}
              </Typography>
            </CardContent>

            {/* Price and Payment Status */}
            <CardActions style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='subtitle2' style={{ marginRight: '8px' }}>
                Invested Amount: ₹{project.investPackage}
              </Typography>
              <Button variant='outlined' disabled={project.paymentStatus === "completed"}>
                {project.paymentStatus}
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyProjects
