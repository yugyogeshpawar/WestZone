// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Gift from 'mdi-material-ui/Gift'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountPlus from 'mdi-material-ui/AccountPlus'
import Projector from 'mdi-material-ui/Projector'
import FaceAgent from 'mdi-material-ui/FaceAgent'
import AccountCog from 'mdi-material-ui/AccountCog'
import Cog from 'mdi-material-ui/Cog'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import MicrosoftTeams from 'mdi-material-ui/MicrosoftTeams'
import DownloadBox from 'mdi-material-ui/DownloadBox'
import AccountCircle from 'mdi-material-ui/AccountCircle'
import CheckDecagramOutline from 'mdi-material-ui/CheckDecagramOutline'
import CashMultiple from 'mdi-material-ui/CashMultiple'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      title: 'Gift Receipt',
      icon: Gift,
      path: '/dashboards/gifts'
    },
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
    {
      title: 'Money Making',
      icon: CashMultiple,
      path: '/dashboards/money-making'
    },
    {
      title: 'Check ins',
      icon: CheckDecagramOutline,
      path: '/dashboards/check-ins'
    }, {
      title: 'Products',
      icon: CheckDecagramOutline,
      path: '/dashboards/products'
    },
    {
      sectionTitle: 'User'
    },
    {
      title: 'Account',
      icon: AccountCog,
      path: '/account',
    },
    {
      title: 'Profile',
      icon: AccountCircle,
      path: '/pages/login',
    },
    {
      title: 'Settings',
      icon: Cog,
      path: '/pages/login',
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}

export default navigation
