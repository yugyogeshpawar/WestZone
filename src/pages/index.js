import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext } from 'src/@core/context/JWTContext';
import LoadingScreen from 'src/@core/components/LoadingScreen';
import Dashboard from './dashboard'


const Index = () => {
  const { user } = useAuth();
  const router = useRouter();
  const authContext = useContext(AuthContext);

  if (!authContext.isInitialized || !authContext.isAuthenticated) {
    return <LoadingScreen />; // Replace with your loading component
  }
  return (
    <Dashboard />
  )
}

export default Index