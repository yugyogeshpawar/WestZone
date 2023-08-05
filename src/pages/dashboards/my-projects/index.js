import React from 'react'
import { Typography, IconButton, Card, CardContent, CardActions, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SubjectIcon from '@mui/icons-material/Subject'
import { useTheme, useMediaQuery } from '@mui/material';

const MyProjects = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  // Sample project data (you can replace this with your actual project data)
  const projects = [
    {
      id: 1,
      subject: 'Project A',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      createdAt: '2023-07-29',
      price: '$100',
      received: false
    },
    {
      id: 2,
      subject: 'Project B',
      description: 'Praesent eu dui non augue malesuada dignissim.',
      createdAt: '2023-07-30',
      price: '$150',
      received: true
    }
  ]

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
          <Card key={project.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.33% - 16px)' } }}>
            <CardContent>
              {/* Project Icon and Subject */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <SubjectIcon />
                <Typography variant='subtitle1' style={{ marginLeft: '8px' }}>
                  {project.subject}
                </Typography>
              </div>

              {/* Project Description */}
              <Typography variant='body2' style={{ marginBottom: '8px' }}>
                {project.description}
              </Typography>

              {/* Created At */}
              <Typography variant='body2' style={{ color: '#888' }}>
                Created at: {project.createdAt}
              </Typography>
            </CardContent>

            {/* Price and Received Button */}
            <CardActions style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='subtitle2' style={{ marginRight: '8px' }}>
                {project.price}
              </Typography>
              <Button variant='outlined' disabled={project.received}>
                Received
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyProjects
