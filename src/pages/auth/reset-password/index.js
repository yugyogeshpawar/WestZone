import React, { useState } from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import axios from 'axios'
import { Box, Button, Typography, CardContent, OutlinedInput, styled, InputLabel } from '@mui/material'
import MuiCard from '@mui/material/Card'
import { Snackbar, Alert } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const ResetPassword = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password is too short - should be 6 characters minimum.')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  })

  const handleSubmit = async values => {
    setLoading(true)
    setError(null)

    const resetToken = router.query.token

    try {
      const response = await axios.post('/api/auth/reset-password', {
        resetPasswordToken: resetToken,
        newPassword: values.password
      })

      setLoading(false)
      router.push('/auth/login')
    } catch (error) {
      console.log(error)
      setError('Invalid Token or Password')
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
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, textAlign: 'center' }}>
              Reset Your Password
            </Typography>
            <Typography variant='body2' style={{ textAlign: 'center' }}>
              Please enter your new password.
            </Typography>
          </Box>
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form noValidate autoComplete='off'>
                <Box sx={{ mb: 4 }}>
                  <InputLabel htmlFor='password'>New Password</InputLabel>
                  <Field as={OutlinedInput} autoFocus fullWidth id='password' name='password' type='password' />
                  <ErrorMessage
                    name='password'
                    component={Typography}
                    color='error'
                    variant='body2'
                    style={{ marginBottom: '20px' }}
                  />
                </Box>
                <Box sx={{ mb: 4 }}>
                  <InputLabel htmlFor='confirmPassword'>Confirm New Password</InputLabel>
                  <Field as={OutlinedInput} fullWidth id='confirmPassword' name='confirmPassword' type='password' />
                  <ErrorMessage
                    name='confirmPassword'
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
                  {loading ? 'Resetting Password...' : 'Reset Password'}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity='error' sx={{ width: '100%' }}>
          {error || 'An unknown error occurred'}
        </Alert>
      </Snackbar>
    </Box>
  )
}

ResetPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ResetPassword
