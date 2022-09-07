import '../styles/_globals.scss'
//import '../assets/libs/boxicons-2.1.1/css/boxicons.min.css'
//import '../styles/App.scss'

import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
      
  return (
       <Component {...pageProps} />
      
  ) 
}

export default MyApp
