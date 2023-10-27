import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'

export const metadata = {
  title: 'UNZA Application System',
  description:
    'UNZA Application System Database Project',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
