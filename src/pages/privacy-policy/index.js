import PrivacyPolicy from './PrivacyPolicy'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const PrivacyPolicyPage = () => {
  return <PrivacyPolicy />
}

PrivacyPolicyPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default PrivacyPolicyPage
