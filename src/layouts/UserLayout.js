import { useContext } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { AuthProvider, AuthContext } from 'src/@core/context/JWTContext'
import LoadingScreen from 'src/@core/components/LoadingScreen'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'

// ** Component Import
import UpgradeToProButton from './components/UpgradeToProButton'
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

const UserLayout = ({ children }) => {
  const router = useRouter()

  const authContext = useContext(AuthContext)

  if (!authContext.isInitialized) {
    return <LoadingScreen /> // Replace with your loading component
  }

  if (authContext.isAuthenticated == 0) {
    return <LoadingScreen /> // Replace with your loading component
  }

  if (authContext.isAuthenticated == 2) {
    router.push('/auth/login')

    return <LoadingScreen />
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { settings, saveSettings } = useSettings()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  // useEffect(() => {
  //   if (!authContext.isAuthenticated && !router.pathname.includes('/auth/')) {
  //     router.push('/auth/login')
  //   }
  // }, [input])

  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={VerticalNavItems()} // Navigation Items
      // afterVerticalNavMenuContent={UpgradeToProImg}
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      {children}
      <UpgradeToProButton />
    </VerticalLayout>
  )
}

export default UserLayout
