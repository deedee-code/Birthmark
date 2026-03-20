import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/contexts/auth-context'
import { SwRegister } from '@/components/sw-register'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: '--font-sans' });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Birthmark - Never Miss a Birthday',
  description: 'Birthmark is a web automation tool that sends birthday wishes to your loved ones automatically. Never miss a chance to celebrate the special moments of those who matter most.',
  keywords: ['birthday', 'automation', 'reminders', 'notifications', 'celebration'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icons/birthmark-512.png',
        type: 'image/png',
      },
    ],
    apple: '/icons/birthmark-512.png',
  },
  openGraph: {
    title: 'Birthmark - Never Miss a Birthday',
    description: 'Automated birthday wishes for your loved ones',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
        <SwRegister />
        <Analytics />
      </body>
    </html>
  )
}
