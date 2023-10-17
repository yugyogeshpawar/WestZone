// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import { useRouter } from 'next/router'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {
  // ** States
  const router = useRouter()

  const [values, setValues] = useState({
    mobile: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    sponsorId: ''
  })

  useEffect(() => {
    if (router.query.ref) {
      setValues(prevValues => ({ ...prevValues, sponsorId: router.query.ref }))
    }
  }, [router.query])

  const [error, setError] = useState(null)

  // ** Hook
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const StyledLink = styled('a')({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  })

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleRegister = async e => {
    e.preventDefault()

    if (!values.mobile || !/^\d{10}$/.test(values.mobile)) {
      setError('Please enter a valid 10-digit mobile number.')

      return
    }

    // Username validation
    if (!values.username) {
      setError('Username is required.')

      return
    }

    if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      setError('Please enter a valid email address.')

      return
    }

    if (!values.password || values.password.length < 8) {
      setError('Password must be at least 8 characters long.')

      return
    }

    // Send a POST request to the registration endpoint
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mobileNumber: values.mobile,
          username: values.username,
          email: values.email,
          password: values.password,
          sponsorId: values.sponsorId
        })
      })

      if (!response.ok) {
        // Handle error response
        const errorData = await response.json()
        setError(errorData.message || 'Registration failed')

        return
      }
      alert('Registration successful! and otp sent to your Email.');
      const responseData = await response.json()
      router.push(`/auth/verify-otp?userId=${responseData.userId}`)
    } catch (err) {
      // Handle other errors
      setError('An error occurred during registration')
    }
  }

  return (
    <Box className='content-center'>
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
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Adventure starts here 🚀
            </Typography>
            <Typography variant='body2'>Make your app management easy and fun!</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleRegister}>
            <Typography variant='body2' sx={{ marginBottom: 4, color: 'red' }}>
              {error && <div>{error}</div>}
            </Typography>
            <TextField
              fullWidth
              id='sponsorId'
              label='Sponsor ID'
              value={values.sponsorId}
              onChange={handleChange('sponsorId')}
              sx={{ marginBottom: 4 }}
            />
            <TextField
              autoFocus
              fullWidth
              id='mobile'
              label='Mobile No.'
              value={values.mobile}
              onChange={handleChange('mobile')}
              sx={{ marginBottom: 4 }}
            />
            <TextField
              autoFocus
              fullWidth
              id='username'
              label='Username'
              value={values.username}
              onChange={handleChange('username')}
              sx={{ marginBottom: 4 }}
            />
            <TextField
              fullWidth
              type='email'
              label='Email'
              value={values.email}
              onChange={handleChange('email')}
              sx={{ marginBottom: 4 }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-register-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Fragment>
                  <span>I agree to </span>
                  <Link href='/' passHref>
                    <LinkStyled onClick={e => e.preventDefault()}>privacy policy & terms</LinkStyled>
                  </Link>
                </Fragment>
              }
            />
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }}>
              Sign up
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/auth/login'>
                  <LinkStyled>Sign in instead</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
