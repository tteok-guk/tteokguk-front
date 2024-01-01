import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import Providers from '@/components/Providers'

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
})
const soyo = localFont({
  src: '../../public/fonts/SoyoMapleBold.ttf',
  display: 'swap',
  variable: '--font-soyo',
})

export const metadata: Metadata = {
  title: '니떡국 내떡국',
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
      <body className={`${pretendard.className} ${soyo.variable} h-dvh w-full bg-gray-100`}>
        {/* 리액트쿼리 프로바이저 */}
        <Providers>
          <main className="relative mx-auto h-full min-w-320 max-w-575 overflow-y-auto bg-bg px-20 pt-32">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
