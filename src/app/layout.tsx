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
  description: '떡국 고명에 마음을 담아 덕담을 주고 받아요!',
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
