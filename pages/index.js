import Ubuntu from "../components/ubuntu";
import ReactGA from 'react-ga4';
import Meta from "../components/SEO/Meta";
import { useEffect } from 'react';
import { getConsent } from '../lib/telemetry';

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;

function App() {
  useEffect(() => {
    if (!TRACKING_ID || typeof window === 'undefined') return undefined
    let initialized = false
    const initializeIfAllowed = () => {
      if (!initialized && getConsent() === 'accepted') {
        ReactGA.initialize(TRACKING_ID.trim())
        initialized = true
      }
    }
    initializeIfAllowed()
    window.addEventListener('voidx3d-consent-change', initializeIfAllowed)
    return () => window.removeEventListener('voidx3d-consent-change', initializeIfAllowed)
  }, []);

  return (
    <>
      <Meta />
      <Ubuntu />
    </>
  )
}

export default App;
