import Footer from '@/components/molecules/Footer'
import Navbar from '@/components/molecules/Navbar'
import '@/styles/globals.css'
import '@/styles/tweaks.scss'
import { Metadata } from 'next'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Strikr',
    template: '%s | Strikr'
  },
  description: 'Game analytics, history tracker & community hub for Omega Strikers',
  icons: {
   icon: '/i/misc/logo.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
