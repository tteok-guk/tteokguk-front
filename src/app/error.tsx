'use client'

import { useEffect } from 'react'
import { ErrorProps } from '@/types/CommonTypes'
import { Error } from '@/components/common'

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (['local', 'develop'].includes(`${process.env.NEXT_PUBLIC_RUN_MODE}`)) {
      console.error(error)
    }
  }, [error])

  return <Error type="error" />
}
