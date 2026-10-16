import 'tailwindcss/tailwind.css'
import '../styles/index.css'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next'
import ConsentBanner from '../components/privacy/ConsentBanner';
import { useEffect, useState } from 'react';
import { getConsent } from '../lib/telemetry';

function MyApp({ Component, pageProps }) {
  const [consent, setConsent] = useState(null)
  useEffect(() => {
    const syncConsent = () => setConsent(getConsent())
    syncConsent()
    window.addEventListener('storage', syncConsent)
    window.addEventListener('voidx3d-consent-change', syncConsent)
    return () => {
      window.removeEventListener('storage', syncConsent)
      window.removeEventListener('voidx3d-consent-change', syncConsent)
    }
  }, [])

  return (
    <>
      <Component {...pageProps} />
      <ConsentBanner />
      {consent === 'accepted' && <><Analytics /><SpeedInsights /></>}
    </>
  )
}

export default MyApp
