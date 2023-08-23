// pages/privacy-policy.js
import Head from 'next/head'
import Link from 'next/link'

const PrivacyPolicy = () => {
  return (
    <div>
      <Head>
        <title>Privacy Policy | Westzone Store</title>
        <meta name='description' content='Westzone Store Privacy Policy' />
      </Head>
      <h1>Privacy Policy</h1>
      <section>
        <h2>Introduction</h2>
        <p>
          At Westzone Store, we respect your privacy and are committed to protecting it. This Privacy Policy outlines
          our practices concerning the collection, use, and sharing of your personal information.
        </p>
      </section>
      <section>
        <h2>Data Collection</h2>
        <p>
          We do not collect any personal data from our users. Users can freely navigate our app without providing any
          personal information.
        </p>
      </section>
      <section>
        <h2>Data Sharing</h2>
        <p>We do not share user data with any third parties.</p>
      </section>
      <section>
        <h2>Your Consent</h2>
        <p>By using our app, you consent to our privacy policy.</p>
      </section>
      <section>
        <h2>Changes to this policy</h2>
        <p>If we decide to change our privacy policy, we will post those changes on this page.</p>
      </section>
      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions regarding this privacy policy, you can{' '}
          <Link href='/contact'>
            <a>Contact us</a>
          </Link>
          .
        </p>
      </section>
    </div>
  )
}

export default PrivacyPolicy
