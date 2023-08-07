// ** Next Imports
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { AuthProvider, AuthContext } from 'src/@core/context/JWTContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import '../../styles/invitation-page.css'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const authContext = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    // if user not isInitialized then show loading screen
    if (authContext.isInitialized) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [authContext.isInitialized, router]) // Dependencies added here

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName}`}</title>
        <meta name='description' content={`${themeConfig.templateName}.`} />
        <meta name='keywords' content={`${themeConfig.templateName}.`} />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <AuthProvider>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </AuthProvider>
    </CacheProvider>
  )
}

export default App
