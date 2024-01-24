import { useState, useEffect } from 'react'
import { OnboardingData } from '../../data/mainTitle'
import Image, { StaticImageData } from 'next/image'
import { dragonNotWalkSmall, dragonWalkSmall } from '../../public/images/avatar/small'
import { sampleDish } from '../../public/images/dishes'

export default function Onboarding({ step }: { step: number }) {
  const [walk, setWalk] = useState(false)

  const CHANGE_STEP_TIME = 300
  const dragonImg: StaticImageData = !walk ? dragonNotWalkSmall : dragonWalkSmall

  const sizeFitClass = 'max-w-full max-h-full object-contain'

  useEffect(() => {
    const interval = setInterval(() => {
      setWalk((prev) => !prev)
    }, CHANGE_STEP_TIME)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {OnboardingData.map(
        (item) =>
          item.step === step && (
            <>
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
              <div
                className={`flex-center mt-10 h-[80%] flex-col p-20
                ${step === 1 ? 'p-50' : 'p-20'}
              `}
              >
                {step === 1 && (
                  <>
                    <Image
                      src={dragonImg}
                      loading="eager"
                      alt="걷는 용 일러스트"
                      className={`z-10 mb-[-5px] ml-18 ${sizeFitClass}`}
                    />
                    <Image
                      src={sampleDish}
                      loading="eager"
                      alt="떡국 샘플 일러스트"
                      className={`animate-spin-slow ${sizeFitClass}`}
                    />
                  </>
                )}
                {step !== 1 && (
                  <Image src={item.src} alt={item.alt} className="h-full w-full object-contain" />
                )}
              </div>
            </>
          ),
      )}
    </>
  )
}
