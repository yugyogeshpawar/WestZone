import { useContext } from 'react'
import { AuthContext } from 'src/@core/context/JWTContext'
import LoadingScreen from 'src/@core/components/LoadingScreen'
import Dashboard from './dashboard'

const Index = () => {
  const authContext = useContext(AuthContext)

  if (!authContext.isInitialized || !authContext.isAuthenticated) {
    return <LoadingScreen />
  }

  return <Dashboard />
}

export default Index
