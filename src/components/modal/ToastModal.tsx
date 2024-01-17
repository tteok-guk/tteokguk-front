'use client'

import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { ToastState } from '@/store/ToastAtom'
import { useToast } from '@/hooks/use-toast'

export default function ToastModal() {
  const [isToast, setIsToast] = useRecoilState(ToastState)
  const { toast } = useToast()

  useEffect(() => {
    if (isToast.open && isToast.msg) {
      toast({ description: isToast.msg })
    }
  }, [isToast])

  return <></>
}
