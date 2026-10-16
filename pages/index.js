import Ubuntu from "../components/ubuntu";
import ReactGA from 'react-ga4';
import Meta from "../components/SEO/Meta";
import { useEffect } from 'react';

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;

function App() {
  useEffect(() => {
    if (TRACKING_ID && typeof window !== 'undefined') {
      ReactGA.initialize(TRACKING_ID.trim());
    }
  }, []);

  return (
    <>
      <Meta />
      <Ubuntu />
    </>
  )
}

export default App;
