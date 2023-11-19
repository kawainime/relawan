
import MainLayoutx from '@/layouts/Mainlayout'
import "@/assets/css-import-all.css"
import "@/assets/style.css";
import "@/assets/loading-spinner.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
import dynamic from 'next/dynamic';
import { MyProvider } from '@/interface/myContext';



const Admin = dynamic(() => import('@/layouts/Mainlayout'), { ssr: true })
export default function App({ Component, pageProps }: AppProps) {




    else {
      return <MyProvider>
        <Admin>
          <NextNProgress color="#FF0009" startPosition={0.3} stopDelayMs={200} height={6} showOnShallow={false} />
          <Component {...pageProps} />
        </Admin>
      </MyProvider>
    }

  }
  else {
    return <MyProvider>
      <Admin>
        <NextNProgress color="#FF0009" startPosition={0.3} stopDelayMs={200} height={6} showOnShallow={false} />
        <Component {...pageProps} />
      </Admin>
    </MyProvider>

  }
}


