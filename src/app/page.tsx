'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Onboarding } from '../../data/mainTitle'
import { useState } from 'react'
import { iconKakao } from '../../public/images/icons'
import { dragonSmall, dragonWalkSmall } from '../../public/images/avatar/small'
import { sampleDish } from '../../public/images/dishes'

export default function AuthPage() {
  const [step, setStep] = useState(1)

  const kakaoLink = process.env.NEXT_PUBLIC_KAKAO_KEY

  const loginHandler = () => (window.location.href = `${kakaoLink && kakaoLink}`)

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
                  <div className="flex-center mt-50 w-full flex-col border-2">
                    <div>
                      <Image
                        src={dragonWalkSmall}
                        width={91}
                        height={108}
                        alt=""
                        className="max-h-152 min-h-91 min-w-108"
                      />
                    </div>
                    <div>
                      <Image
                        src={sampleDish}
                        width={159}
                        height={159}
                        alt=""
                        className="max-h-280 min-h-159 min-w-159 max-w-280"
                      />
                    </div>
                  </div>
                </>
              ),
          )}
        </div>
        <div className="flex h-[10%] items-start justify-center">페이지네이션 영역</div>
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
