'use client'

import { toast } from '@/hooks/use-toast'
import { BtnType } from '@/types/MainPageTypes'
import { redirect, usePathname } from 'next/navigation'
import { BottomButton } from './common'
import { burger, share } from '../../public/images/icons'
import Image from 'next/image'
import { shareBubble } from '../../public/images/etc'

const ShareButton = ({ btnType = 'none', tteokGukId, nickname }: BtnType) => {
  const handleCopyClipBoard = async (text: string) => {
    if (tteokGukId) {
      try {
        await navigator.clipboard.writeText(text)
        toast({ description: 'URL 복사가 완료되었습니다.' })

        // alert('복사 성공!')
      } catch (error) {
        alert('복사 실패!')
      }
    }
  }
  const pathname = usePathname()

  return (
    <>
      {pathname !== '/host' ? (
        <BottomButton
          bgColor="bg-transperant"
          split="twice"
          smallBtnName="내떡국"
          fullBtnName="덕담 남기기"
          smallBtnHref="/host?page=1"
          fullBtnHref={`/${tteokGukId}/set-garnish?nickname=${nickname}`}
        />
      ) : btnType === 'openTwice' && tteokGukId ? (
        <BottomButton
          bgColor="bg-transperant"
          split="openTwice"
          icon={share}
          fullBtnIcon={burger}
          fullBtnName="받은 덕담 모아보기"
          smallBtnClick={() =>
            handleCopyClipBoard(`${process.env.NEXT_PUBLIC_BASE_URL}/${tteokGukId}?page=1`)
          }
          fullBtnHref={`/${tteokGukId}/garnish-list`}
        />
      ) : (
        <BottomButton
          bgColor="bg-transperant"
          fullBtnName={tteokGukId ? '내떡국 공유하기' : '내떡국 만들기'}
          fullBtnHref={!tteokGukId ? '/make-dish' : ''}
          fullBtnClick={() =>
            handleCopyClipBoard(`${process.env.NEXT_PUBLIC_BASE_URL}/${tteokGukId}?page=1`)
          }
        />
      )}
    </>
  )
}

export default ShareButton
