
import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | EasyDCF',
    default: 'EasyDCF | India’s Trusted TReDS Platform for MSME Payments',
  },
  description: 'EasyDCF is a safe, trusted TReDS platform in India that helps MSMEs get faster payments through secure, transparent invoice discounting.',
  icons: {
    icon: '/logo.png', // for favicon
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Head>
  <link rel="icon" href="/logo.png" />
</Head>
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
    </>
  )
}
