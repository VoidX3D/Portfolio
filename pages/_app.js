import 'tailwindcss/tailwind.css'
import '../styles/index.css'
import { Analytics } from '@vercel/analytics/next';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
