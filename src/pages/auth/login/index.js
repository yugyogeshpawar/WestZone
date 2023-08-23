import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import useAuth from 'src/@core/hooks/useAuth'
import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
  IconButton,
  CardContent,
  OutlinedInput,
  InputAdornment,
  styled,
  useTheme,
  InputLabel
} from '@mui/material'
import MuiCard from '@mui/material/Card'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
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

const LoginPage = () => {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const theme = useTheme()
  const router = useRouter()
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  useEffect(() => {
    setSession(null)
    
    // loadCaptchaEnginge(6)
  }, [])

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const validationSchema = Yup.object().shape({
    mobile: Yup.string().required('Mobile is required'),
    password: Yup.string().required('Password is required')
  })

  const StyledLink = styled('a')({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  })

  const handleSubmit = async values => {
    setLoading(true)
    setError(null)

    try {
      const response = await login(values.mobile, values.password)
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
            <StyledLink>
              <Image src='/images/logo/main-logo.png' alt='Logo' width={150} height={15} />
              {/* <HeaderTitle variant='h6' sx={{ ml: 3 }}>
              {themeConfig.templateName}
            </HeaderTitle> */}
            </StyledLink>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, textAlign: 'center' }}>
              Welcome to {themeConfig.templateName}!
            </Typography>
            <Typography variant='body2' style={{ textAlign: 'center' }}>
              Please sign-in to your account and start the Journey
            </Typography>
          </Box>
          <Formik
            initialValues={{ mobile: '', password: '', showPassword: false }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form noValidate autoComplete='off'>
                <Box sx={{ mb: 4 }}>
                  <InputLabel htmlFor='mobile'>Mobile</InputLabel>
                  <Field as={OutlinedInput} autoFocus fullWidth id='mobile' name='mobile' />
                  <ErrorMessage
                    name='mobile'
                    component={Typography}
                    color='error'
                    variant='body2'
                    style={{ marginBottom: '20px' }}
                  />
                </Box>
                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                <Field
                  as={OutlinedInput}
                  fullWidth
                  id='auth-login-password'
                  name='password'
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={() => setFieldValue('showPassword', !values.showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <ErrorMessage
                  name='password'
                  component={Typography}
                  color='error'
                  variant='body2'
                  style={{ marginBottom: '20px' }}
                />

                {error && (
                  <Typography variant='body2' color='error'>
                    {error}
                  </Typography>
                )}
                <Box
                  sx={{
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}
                >
                  <FormControlLabel control={<Checkbox />} label='Remember Me' />
                  <Link passHref href='/auth/forgot-password'>
                    <LinkStyled>Forgot Password?</LinkStyled>
                  </Link>
                </Box>
                <Button
                  fullWidth
                  size='large'
                  variant='contained'
                  sx={{ marginBottom: 7 }}
                  type='submit'
                  disabled={isSubmitting}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Typography variant='body2' sx={{ marginRight: 2 }}>
                    New on our platform?
                  </Typography>
                  <Typography variant='body2'>
                    <Link passHref href='/auth/register'>
                      <LinkStyled>Create an account</LinkStyled>
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
      >
        <Alert onClose={handleSnackbarClose} severity='error' variant='filled' sx={{ width: '100%' }}>
          {error || 'An unknown error occurred'}
        </Alert>
      </Snackbar>
    </Box>
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
