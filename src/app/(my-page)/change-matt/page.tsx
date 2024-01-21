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
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { sampleDish } from '../../../../public/images/dishes'

export default function ChangeMattPage() {
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
        <div
          className={`mx-[-20px] mt-[-32px] h-[55%] bg-[url(/images/matts/${chosenMatt}.png)] bg-cover bg-no-repeat px-20 pt-32`}
        >
          <TopButton />
          <p className="font-xl">
            변경할 테이블 매트를 <br /> 선택해 주세요
          </p>
          <div className="absolute left-1/2 h-350 w-350 -translate-x-1/2 p-65">
            <Image src={sampleDish} alt="dish image" className="" />
          </div>
        </div>
        <div className="grid basis-1/4 grid-cols-4 grid-rows-2 gap-12">
          {AllMatt.map((matt, idx) => (
            <button key={idx} onClick={() => setMatt(matt.id)}>
              <Image
                width={95}
                height={95}
                src={matt.src}
                alt={matt.alt}
                className={`m-auto mt-20 ${
                  chosenMatt === matt.id ? 'rounded-md border-3 border-pr-500' : ''
                }`}
              />
            </button>
          ))}
        </div>
        <BottomButton fullBtnName="완료" fullBtnClick={completeBtn} />
      </div>
    </>
  )
}
