import Footer from '@/components/molecules/Footer'
import Navbar from '@/components/molecules/Navbar'
import { Metadata } from 'next'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}>
        <Navbar />
        {children}
        <Footer />
    </div>
  )
}
