import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '',
  description: '',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no',
  // todo 편지쓰기 키보드 영역 확인 후 interactiveWidget 재조정
  interactiveWidget: 'overlays-content',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-dvh w-full bg-gray-100`}>
        <main className="min-w-320 max-w-575 relative mx-auto overflow-y-auto h-full bg-white px-20 pt-32">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
