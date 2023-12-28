'use client'

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
  return (
    <BottomButton
      fullBtnName="덕담 남기기"
      fullBtnClick={() => handleCopyClipBoard('https://develop-tteokguk.vercel.app/니떡국')}
    />
  )
}

export default ShareButton
