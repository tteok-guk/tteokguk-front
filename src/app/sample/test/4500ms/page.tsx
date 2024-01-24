'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Onboarding from '@/components/Onboarding'

export default function Test4500() {
  const [step, setStep] = useState(1)

  const router = useRouter()

  const CHANGE_STEP_TIME = 4500
  const STEP_LENGTH = 4

  const movePage = () => (window.location.href = '/sample/test')

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
          onClick={movePage}
          className="rounded-12 bg-[#FFE42D] text-17 font-medium text-[#181818] hover:bg-[#f5dd44] active:bg-[#f5dd44]"
        >
          뒤로가기 (여기는 4500ms)
        </Button>
      </div>
    </section>
  )
}
