import './globals.css'
import { Inter } from 'next/font/google'
import Footer from './components/Footer'
import Header from './components/Header'
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
            {children}
          {/* <Footer/> */}
        </Providers>
      </body>
    </html>
  )
}
