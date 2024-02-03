import React from 'react'
import Image from 'next/image'
import { OnboardingData } from '../../data/mainTitle'
import { dragonWalk } from '../../public/images/avatar'

export default function Onboarding({ step }: { step: number }) {
  return (
    <>
      {OnboardingData.map(
        (item) =>
          item.step === step && (
            <React.Fragment key={item.step}>
              <h1 className="flex h-[18%] flex-col items-center justify-center gap-4">
                <span className="font-soyoThin text-12 font-bold leading-15 text-gr-400">
                  {item.desc}
                </span>
                <span
                  className={`font-soyo text-28 leading-36
                    ${step === 1 ? 'text-pr-500' : 'text-gr-900'}
                `}
                >
                  {item.title}
                </span>
              </h1>
              <div className="mt-10 h-[80%] flex-col p-20">
                {step === 1 ? (
                  <div className="flex-center h-full w-full flex-col">
                    <Image
                      src={dragonWalk}
                      loading="eager"
                      alt="걷는 용 일러스트"
                      className={`mb-[-5px] ml-25 h-[25%] object-contain`}
                      priority
                    />
                    <Image
                      src={item.src}
                      loading="eager"
                      alt="떡국 샘플 일러스트"
                      className={`h-[75%] animate-spin-slow object-contain`}
                      priority
                    />
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    loading="eager"
                    alt={item.alt}
                    className="h-full w-full object-contain"
                    priority
                  />
                )}
              </div>
            </React.Fragment>
          ),
      )}
    </>
  )
}
