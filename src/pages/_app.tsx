
import MainLayoutx from '@/layouts/Mainlayout'
import "@/assets/css-import-all.css"
import "@/assets/style.css";
import "@/assets/loading-spinner.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
export default function App({ Component, pageProps }: AppProps) {
  return <MainLayoutx>
    <NextNProgress color="#FF0009" startPosition={0.3} stopDelayMs={200} height={6} showOnShallow={false} />
    <Component {...pageProps} />
  </MainLayoutx>
}
