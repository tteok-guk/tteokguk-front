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
      {['local', 'develop'].includes(`${process.env.NEXT_PUBLIC_RUN_MODE}`) && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
