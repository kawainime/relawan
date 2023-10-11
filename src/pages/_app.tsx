
import MainLayoutx from '@/layouts/Mainlayout'
import "@/assets/css-import-all.css"
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
export default function App({ Component, pageProps }: AppProps) {
  return <MainLayoutx>
    <NextNProgress />
    <Component {...pageProps} />
  </MainLayoutx>
}
