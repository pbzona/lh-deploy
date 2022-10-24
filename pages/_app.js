import SdkPing from '../components/SdkPing'
import 'nextra-theme-docs/style.css'
import './global.css'

export default function Nextra({ Component, pageProps }) {
  return (
    <>
      <SdkPing />
      <Component {...pageProps} />
    </>
  )
}
