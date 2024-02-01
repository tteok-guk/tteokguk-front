'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { iconCarousel, iconKakao } from '../../public/images/icons'
import Onboarding from '@/components/Onboarding'

export default function AuthPage() {
  const [step, setStep] = useState(1)

  const CHANGE_STEP_TIME = 3700
  const STEP_LENGTH = 4
  const kakaoLink = process.env.NEXT_PUBLIC_KAKAO_KEY
  const carouselElements = [
    { move: 'prev', alt: '왼쪽', styleClass: 'left-0 rotate-180' },
    { move: 'next', alt: '오른쪽', styleClass: 'right-0' },
  ]

  // * 카카오 로그인
  const loginHandler = () => (window.location.href = `${kakaoLink && kakaoLink}`)

  // * 캐러셀
  const moveStep = (move: string) => {
    setStep((prev) =>
      move === 'prev' ? ((prev - 1 + STEP_LENGTH - 1) % STEP_LENGTH) + 1 : (prev % STEP_LENGTH) + 1,
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev % STEP_LENGTH) + 1)
    }, CHANGE_STEP_TIME)
    return () => clearInterval(interval)
  }, [step])

  return (
    <section className="relative h-full">
      <div className="root-content-height overflow-y-hidden">
        <div className="flex-center h-[90%] flex-col">
          <Onboarding step={step} />
          {carouselElements.map((item) => (
            <Image
              key={item.move}
              src={iconCarousel}
              width={10}
              height={18}
              loading="eager"
              alt={`${item.alt}을 향하고 있는 화살표 아이콘`}
              onClick={() => moveStep(item.move)}
              className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${item.styleClass}`}
            />
          ))}
        </div>
        <div className="flex h-[10%] items-start justify-center gap-4 pt-24">
          {[1, 2, 3, 4].map((item, idx) => (
            <Button
              key={idx}
              onClick={() => setStep(item)}
              className={`h-8 w-8 ${step === item ? 'bg-pr-300' : 'bg-gr-100'}`}
            ></Button>
          ))}
        </div>
      </div>
      {/* <div className="root-bottom-height flex-center flex-col gap-8 border-2 border-red-500 py-24"> */}
      <div className="root-bottom-height flex flex-col gap-10">
        <Button
          size="full"
          href="/e75c43ec-3ec3-42bf-8b7a-7d96a0f7909b?page=1"
          className="rounded-12 bg-pr-100 text-17 font-medium text-[#181818] hover:bg-pr-200 active:bg-pr-200"
        >
          로그인 없이 구경하기
        </Button>
        <Button
          size="full"
          onClick={loginHandler}
          className="rounded-12 bg-[#FFE42D] text-17 font-medium text-[#181818] hover:bg-[#f5dd44] active:bg-[#f5dd44]"
        >
          <Image src={iconKakao} width={24} height={21} alt="카카오톡 아이콘" className="mr-8" />
          카카오로 시작하기
        </Button>
      </div>
    </section>
  )
}
