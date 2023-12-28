'use client'

import { usePathname } from 'next/navigation'
import { BottomButton } from './common'

const ShareButton = () => {
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // alert('복사 성공!');
    } catch (error) {
      alert('복사 실패!')
    }
  }
  const pathname = usePathname()

  return (
    <>
      {pathname === '/my' ? (
        <BottomButton
          fullBtnName="덕담 남기기"
          fullBtnClick={() => handleCopyClipBoard('https://develop-tteokguk.vercel.app/니떡국')}
        />
      ) : (
        <BottomButton
          split="twice"
          smallBtnName="내떡국"
          fullBtnName="덕담 남기기"
          smallBtnHref="/my"
          fullBtnHref="/dsda/write"
        />
      )}
    </>
  )
}

export default ShareButton
