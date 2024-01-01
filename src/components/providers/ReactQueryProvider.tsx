// 리액트쿼리 프로바이저
'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FC } from 'react'

interface ProvidersProps {
  children: React.ReactNode
}

const ReactQueryProvider: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* //todo env 설정 후 production 환경에서만 devtools 실행되도록 연산자 설정 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
