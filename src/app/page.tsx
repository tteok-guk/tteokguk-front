'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { iconKakao } from '../../public/images/icons'
import Onboarding from '@/components/Onboarding'

export default function AuthPage() {
  const [step, setStep] = useState(1)

  const kakaoLink = process.env.NEXT_PUBLIC_KAKAO_KEY
  const CHANGE_STEP_TIME = 3800
  const STEP_LENGTH = 4

  const loginHandler = () => (window.location.href = `${kakaoLink && kakaoLink}`)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev % STEP_LENGTH) + 1)
    }, CHANGE_STEP_TIME)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="h-full">
      <div className="content-height overflow-y-hidden">
        <div className="flex-center h-[90%] flex-col">
          <Onboarding step={step} />
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
      <div className="bottom-height">
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
