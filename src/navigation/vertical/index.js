// ** Icon imports
import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Gift from 'mdi-material-ui/Gift'
import AccountPlus from 'mdi-material-ui/AccountPlus'
import Projector from 'mdi-material-ui/Projector'
import FaceAgent from 'mdi-material-ui/FaceAgent'
import AccountCog from 'mdi-material-ui/AccountCog'
import Cog from 'mdi-material-ui/Cog'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import MicrosoftTeams from 'mdi-material-ui/MicrosoftTeams'
import DownloadBox from 'mdi-material-ui/DownloadBox'
import AccountCircle from 'mdi-material-ui/AccountCircle'
import ClipboardTextClockOutline from 'mdi-material-ui/ClipboardTextClockOutline'
import CartHeart from 'mdi-material-ui/CartHeart'
import CashFast from 'mdi-material-ui/CashFast'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },

    // {
    //   title: 'Gift Receipt',
    //   icon: Gift,
    //   path: '/dashboards/gifts'
    // },
    {
      title: 'Invitation',
      icon: AccountPlus,
      path: '/dashboards/invitation'
    },
    {
      title: 'My Team',
      icon: MicrosoftTeams,
      path: '/dashboards/myteam'
    },
    {
      title: 'My Projects',
      icon: Projector,
      path: '/dashboards/my-projects'
    },
    {
      title: 'Customer Services',
      icon: FaceAgent,
      path: '/dashboards/customer-services'
    },
    {
      title: 'App Download',
      icon: DownloadBox,
      path: '/dashboards/app-download'
    },

    // {
    //   title: 'Money Making',
    //   icon: CashMultiple,
    //   path: '/dashboards/money-making'
    // },
    {
      title: 'Products',
      icon: CartHeart,
      path: '/dashboards/categoryproducts'
    },
    {
      title: 'History',
      icon: ClipboardTextClockOutline,
      path: '/dashboards/history'
    },
    {
      title: 'Withdraw',
      icon: CashFast,
      path: '/dashboards/withdraw'
    },

    // {
    //   sectionTitle: 'User'
    // },

    // {
    //   title: 'Account',
    //   icon: AccountCog,
    //   path: '/account'
    // },
    // {
    //   title: 'Profile',
    //   icon: AccountCircle,
    //   path: '/pages/login'
    // },
    // {
    //   title: 'Settings',
    //   icon: Cog,
    //   path: '/pages/login'
    // },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/auth/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/auth/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    }
  ]
}

export default navigation
