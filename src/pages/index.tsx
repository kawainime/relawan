import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Data_relawan from './data-relawan.html';
import { useContext, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })
import { useMyContext } from '@/interface/myContext';
export default function Home() {
  const { updateMenu } = useMyContext();

  useEffect(() => {
    updateMenu("beranda");
  }, []);
  return <>
    <center>
      Isi dulu data nya sambil sy selsaikan sistimnya.
      <br />
      1. Isi dulu dulu master Data_relawan<br />
      2. di menu tps. untuk menambahkan tps pada kelurahan. pilih  kelurahan yang ingin du buatkan tps nya.<br />
      3. Isi data calon pendukung.
    </center>
  </>

}
