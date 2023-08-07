// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const SimpleCard = ({ title, icon: IconComponent, link }) => {
  return (
    <a href={link} style={{ textDecoration: 'none', color: 'inherit', maxHeight: '100%' }}>
      <Card
        sx={{
          border: 0,
          boxShadow: 0,
          color: 'common.white',
          backgroundColor: 'info.main',
          '@media (max-width: 600px)': {
            padding: theme => `${theme.spacing(2, 2, 1)} !important`,
            height: '100%'
          }
        }}
      >
        <CardContent
          sx={{
            padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important`,
            display: 'flex',
            flexDirection: 'column', // Set flex direction to column
            alignItems: 'center', // Center align items horizontally
            '@media (max-width: 600px)': {
              padding: theme => `${theme.spacing(2, 2, 1)} !important`
            }
          }}
        >
          {IconComponent && (
            <IconComponent
              sx={{
                height: '50px',
                width: '50px',
                '@media (max-width: 600px)': {
                  height: '30px',
                  width: '30px'
                }
              }}
            />
          )}
          <Typography
            variant='subtitle2'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',  // center text horizontally
              textAlign: 'center', // center text alignment
              width: '100%', // use the full width of the parent container
              whiteSpace: 'normal', // allow the text to wrap to the next line
              overflowWrap: 'break-word', // break words if necessary to prevent overflow
              color: 'common.white',
              '@media (max-width: 600px)': {
                justifyContent: 'center',
                textAlign: 'center'
              }
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    </a>
  )
}

export default SimpleCard
