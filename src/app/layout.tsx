import type { Metadata } from 'next'
import { ReactQueryProvider, RecoilProvider } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'
import localFont from 'next/font/local'
import '@/styles/globals.css'

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
})
const soyo = localFont({
  src: '../../public/fonts/SoyoMapleBold.woff2',
  display: 'swap',
  variable: '--font-soyo',
})
const soyo_thin = localFont({
  src: '../../public/fonts/SoyoMapleRegular.woff2',
  display: 'swap',
  variable: '--font-soyo_thin',
})

export const metadata: Metadata = {
  title: '니떡국 내떡국',
  description: '떡국을 나누고 덕담을 주고 받아요!',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: 'Next.js',
  applicationName: '니떡국 내떡국',
  keywords: [
    '니떡국 내떡국',
    '니떡내떡',
    '온라인 롤링페이퍼',
    '2024년',
    '새해',
    '새해 덕담',
    '덕담',
    '편지',
  ],
  openGraph: {
    title: '니떡국 내떡국',
    description: '떡국을 나누고 덕담을 주고 받아요!',
    siteName: '니떡국 내떡국',
    images: [
      {
        url: 'https://i.imgur.com/WUrE6u9.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '니떡국 내떡국',
    description: '떡국을 나누고 덕담을 주고 받아요!',
    images: [
      {
        url: 'https://i.imgur.com/WUrE6u9.png',
        width: 1200,
        height: 630,
      },
    ],
  },
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
      <body
        className={`${pretendard.className} ${soyo.variable} ${soyo_thin.variable} h-dvh w-full bg-[url(/images/etc/background.svg)]`}
      >
        <ReactQueryProvider>
          <RecoilProvider>
            <main className="layout-scroll relative mx-auto h-full min-w-320 max-w-575 overflow-y-auto bg-bg px-20 pt-32 text-gr-900">
              {children}
            </main>
            <div id="modal-root"></div>
            <Toaster />
          </RecoilProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
