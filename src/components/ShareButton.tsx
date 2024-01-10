'use client'

import { toast } from '@/hooks/use-toast'
import { usePathname } from 'next/navigation'
import { BottomButton } from './common'

const ShareButton = ({ btnType, tteokGukId }: BtnType) => {
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({ description: 'URL 복사가 완료되었습니다.' })

      // alert('복사 성공!')
    } catch (error) {
      alert('복사 실패!')
    }
  }
  const pathname = usePathname()

  return (
    <>
      {pathname === '/host' && (
        <BottomButton
          bgColor="bg-transperant"
          fullBtnName="내떡국 공유하기"
          fullBtnClick={() =>
            handleCopyClipBoard(`https://develop-tteokguk.vercel.app/${tteokGukId}?page=1`)
          }
        />
      )}
      {btnType !== 'snap-shot' && pathname !== '/host' && (
        <BottomButton
          bgColor="bg-transperant"
          split="twice"
          smallBtnName="내떡국"
          fullBtnName="덕담 남기기"
          smallBtnHref="/host"
          fullBtnHref={`/${tteokGukId}/write`}
        />
      )}
    </>
  )
}

export default ShareButton

export interface BtnType {
  btnType?: string
  tteokGukId?: string
}
