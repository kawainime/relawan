
import MainLayoutx from '@/layouts/Mainlayout'
import "@/assets/css-import-all.css"
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <MainLayoutx>
    <Component {...pageProps} />
  </MainLayoutx>
}
