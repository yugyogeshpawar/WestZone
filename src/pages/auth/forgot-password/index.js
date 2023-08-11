import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from '../../../utils/axios'
import { Box, Button, Typography, CardContent, OutlinedInput, styled, InputLabel } from '@mui/material'
import MuiCard from '@mui/material/Card'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import { setSession } from 'src/utils/jwt'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { Snackbar, Alert } from '@mui/material'

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  useEffect(() => {
    setSession(null)
  }, [])

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required')
  })

  const handleSubmit = async values => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('/api/auth/forgot-password', values.email)
      setLoading(false)
      router.push('/dashboard')
    } catch (error) {
      console.log(error)
      setError('Invalid Mobile No. or Password')
      setSnackbarOpen(true)
    }
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  return (
    <Box className='content-center' style={{ minHeight: '80vh' }}>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, textAlign: 'center' }}>
              Forgot your password?
            </Typography>
            <Typography variant='body2' style={{ textAlign: 'center' }}>
              Enter your email to reset your password
            </Typography>
          </Box>
          <Formik initialValues={{ email: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting, values, setFieldValue }) => (
              <Form noValidate autoComplete='off'>
                <Box sx={{ mb: 4 }}>
                  <InputLabel htmlFor='email'>Email</InputLabel>
                  <Field as={OutlinedInput} autoFocus fullWidth id='email' name='email' />
                  <ErrorMessage
                    name='email'
                    component={Typography}
                    color='error'
                    variant='body2'
                    style={{ marginBottom: '20px' }}
                  />
                </Box>
                <Button
                  fullWidth
                  size='large'
                  variant='contained'
                  sx={{ marginBottom: 7 }}
                  type='submit'
                  disabled={isSubmitting}
                >
                  {loading ? 'Sending reset link...' : 'Reset password'}
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Typography variant='body2' sx={{ marginRight: 2 }}>
                    Remember your credentials?
                  </Typography>
                  <Typography variant='body2'>
                    <Link passHref href='/auth/login'>
                      <LinkStyled>Login</LinkStyled>
                    </Link>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Add this line
        sx={{
          '& .MuiPaper-root': {
              backgroundColor: theme.palette.background.default, // or any other color you prefer
          }
      }}
      >
        <Alert onClose={handleSnackbarClose} severity='error' sx={{ width: '100%' }}>
          {error || 'An unknown error occurred'}
        </Alert>
      </Snackbar>
    </Box>
  )
}

ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword
