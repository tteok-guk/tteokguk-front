'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Onboarding } from '../../data/mainTitle'
import { useEffect, useState } from 'react'
import { iconKakao } from '../../public/images/icons'
import { dragonSmall, dragonWalkSmall } from '../../public/images/avatar/small'
import { sampleDish } from '../../public/images/dishes'

export default function AuthPage() {
  const [step, setStep] = useState(1)

  const kakaoLink = process.env.NEXT_PUBLIC_KAKAO_KEY
  const CHANGE_STEP_TIME = 3000
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
      <div className="content-height">
        <div className="flex-center h-[90%] flex-col">
          {Onboarding.map(
            (item) =>
              item.step === step && (
                <>
                  <h1 className="flex-center flex-col gap-4">
                    <span className="font-soyoThin text-12 font-bold leading-15 text-gr-400">
                      {item.desc}
                    </span>
                    <span className="font-soyo text-28 font-bold leading-36 text-pr-500">
                      {item.title}
                    </span>
                  </h1>
                  <div className="flex-center mt-50">step별 이미지</div>
                </>
              ),
          )}
        </div>
        <div className="flex h-[10%] items-start justify-center gap-4">
          {[1, 2, 3, 4].map((item, idx) => (
            <Button
              key={idx}
              onClick={() => setStep(item)}
              className={`h-8 w-8 ${step === item ? 'bg-pr-300' : 'bg-gr-100'}`}
            >
              {''}
            </Button>
          ))}
        </div>
      </div>
      <div className="bottom-height">
        <Button
          size="full"
          onClick={loginHandler}
          className="rounded-12 bg-[#FFE42D] text-17 font-semibold text-[#181818] hover:bg-[#f5dd44] active:bg-[#f5dd44]"
        >
          <Image src={iconKakao} width={24} height={21} alt="카카오톡 아이콘" className="mr-8" />
          카카오로 시작하기
        </Button>
      </div>
    </section>
  )
}
