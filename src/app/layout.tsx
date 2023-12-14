// React
import './globals.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';

// Components
import Footer from './components/Footer'
import Header from './components/Header'

// Redux
import { Providers } from "@/redux/provider";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Music Store',
  description: 'Only place for music lovers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header/>
            <div className='max-w-[1280px] mx-auto'>
              <ToastContainer />
              {children}
            </div>
          {/* <Footer/> */}
        </Providers>
      </body>
    </html>
  )
}
