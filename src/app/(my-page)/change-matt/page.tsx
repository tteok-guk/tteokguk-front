'use client'
import { TopButton } from '@/components/common'
import Image from 'next/image'
import { basicDish } from '../../../../public/images/dishes'
import { BottomButton } from '@/components/common'
import { AllMatt } from '../../../../data/change-matt'
import { useState } from 'react'
import { putMatt } from '@/services/changeMatt'
import { useMutation } from '@tanstack/react-query'
import { MattParamsType } from '@/types/changeMattType'
import { RequestParamType } from '@/types/apiTypes'

export default function ChangeMattPage() {
  const [chosenMatt, setChosenMatt] = useState('')
  const setMatt = (clickedValue: string) => setChosenMatt(clickedValue)

  const onChangeMatt = useMutation({
    mutationFn: (chosenMatt: RequestParamType) => putMatt(chosenMatt),
    onSuccess: (res) => {
      console.log('Success', res)
    },
    onError: (err) => console.log('err', err),
  })
  return (
    <>
      <div className="mx-[-20px] mt-[-32px]">
        <div className="bg h-364 bg-[url(/images/matts/purpleCheck.png)] bg-cover bg-no-repeat">
          <TopButton />
          <p className="font-xl pl-20">
            변경할 테이블 매트를 <br /> 선택해 주세요
          </p>
          <Image
            width={184}
            height={184}
            src={basicDish}
            alt="dish image"
            className="m-auto mt-20"
          />
        </div>
        {/* 메트이미지 클릭시 border 선택표시 활성화 */}
        <div className="grid grid-cols-4 grid-rows-2 gap-x-12">
          {AllMatt.map((matt, idx) => (
            <button key={idx} onClick={() => setMatt(matt.id)}>
              <Image
                width={75}
                height={75}
                src={matt.src}
                alt={matt.alt}
                className={`m-auto mt-20 ${
                  chosenMatt === matt.id ? 'rounded-md border-3 border-pr-500' : ''
                }`}
              />
            </button>
          ))}
        </div>
        <BottomButton fullBtnName="완료" fullBtnClick={onChangeMatt} />
      </div>
    </>
  )
}
