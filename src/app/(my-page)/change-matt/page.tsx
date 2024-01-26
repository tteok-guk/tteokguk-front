'use client'
import { TopButton } from '@/components/common'
import Image from 'next/image'
import { basicDish } from '../../../../public/images/dishes'
import { BottomButton } from '@/components/common'
import { AllMatt } from '../../../../data/change-matt'
import { useState } from 'react'
import { putMatt } from '@/services/changeMatt'
import { useMutation } from '@tanstack/react-query'
import { RequestParamType } from '@/types/apiTypes'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { sampleDish } from '../../../../public/images/dishes'

export default function ChangeMattPage() {
  const params = useSearchParams()
  const mattName = params.get('matt')
  const [chosenMatt, setChosenMatt] = useState('blueDew')
  const setMatt = (clickedValue: string) => setChosenMatt(clickedValue)
  const router = useRouter()
  // const { toast } = useToast()

  const onChangeMatt = useMutation({
    mutationFn: (chosenMatt: RequestParamType) => putMatt(chosenMatt),
    onSuccess: (res) => {
      // toast({ description: '매트가 변경되었습니다.' })
      window.location.href = `/${res.data.tteokGukId}?page=1`
    },
    onError: (err) => console.log('err', err),
  })

  const completeBtn = () => {
    onChangeMatt.mutate({ mattType: chosenMatt })
  }
  return (
    <>
      <div className="h-dvh">
        <div className="content-height">
          <div
            className={`mx-[-20px] mt-[-32px] h-[55%] bg-[url(/images/matts/${chosenMatt}.png)] bg-cover bg-no-repeat px-20 pt-32`}
          >
            <TopButton />
            <p className="font-xl mb-10">
              변경할 테이블 매트를 <br /> 선택해 주세요
            </p>
            <div className="absolute left-1/2 -translate-x-1/2">
              <Image src={sampleDish} alt="dish image" className="" />
            </div>
          </div>
          <div className="mt-20 grid basis-1/4 grid-cols-4 grid-rows-2 gap-12">
            {AllMatt.map((matt, idx) => (
              <button key={idx} onClick={() => setMatt(matt.id)}>
                <Image
                  src={matt.src}
                  alt={matt.alt}
                  className={`m-auto rounded-lg mt-0${
                    chosenMatt === matt.id ? 'rounded-lg border-3 border-pr-500' : ''
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <BottomButton fullBtnName="완료" fullBtnClick={completeBtn} />
      </div>
    </>
  )
}
