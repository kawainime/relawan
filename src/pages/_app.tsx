
import MainLayoutx from '@/layouts/Mainlayout'
import "@/assets/css-import-all.css"
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
export default function App({ Component, pageProps }: AppProps) {
  return <MainLayoutx>
    <NextNProgress color="#F97E00" startPosition={0.3} stopDelayMs={200} height={6} showOnShallow={true} />
    <Component {...pageProps} />
  </MainLayoutx>
}
