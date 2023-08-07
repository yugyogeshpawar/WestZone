import { createContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import axios from '../../utils/axios.js'
import { isValidToken, setSession } from '../../utils/jwt'

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: 0,
  isInitialized: false,
  user: null
}

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    }
  },
  LOGIN: (state, action) => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: 1,
      user
    }
  },
  LOGOUT: state => ({
    ...state,
    isAuthenticated: 0,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: 0,
      user
    }
  }
}

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state)

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
})

AuthProvider.propTypes = {
  children: PropTypes.node
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')

        if (accessToken) {
          setSession(accessToken)
          const headers = { Authorization: `Bearer ${accessToken}` }

          const response = await axios.get(`/api/auth/my-account`, {
            headers
          })
          const { user } = response.data

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: 1,
              user
            }
          })
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: 2,
              user: null
            }
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: 2,
            user: null
          }
        })
      }
    }

    initialize()
  }, [])

  const login = async (mobileNumber, password) => {
    const response = await axios.post('/api/auth/login', {
      mobileNumber,
      password
    })
    const { accessToken, user } = response.data

    setSession(accessToken)
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    })
  }

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/auth/register', {
      email,
      password,
      firstName,
      lastName
    })
    const { accessToken, user } = response.data

    window.localStorage.setItem('accessToken', accessToken)
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    })
  }

  const logout = async () => {
    setSession(null)
    dispatch({ type: 'LOGOUT' })
  }

  const resetPassword = () => {}

  const updateProfile = () => {}

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
