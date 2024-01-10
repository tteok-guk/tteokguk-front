'use client'

import { toast } from '@/hooks/use-toast'
import { GarnishItem, GarnishLocationType, GarnishType } from '@/types/MainPageTypes'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

const Garnish = ({ garnishInfo, Public, dDay, userId }: GarnishType) => {
  const garnishLocation: GarnishLocationType = {
    0: 'top-[123px] left-[122px]',
    1: 'top-[81px] left-[51px]',
    2: 'top-[39px] left-[122px]',
    3: 'top-[81px] left-[194px]',
    4: 'top-[164px] left-[51px]',
    5: 'top-[205px] left-[122px]',
    6: 'top-[164px] left-[194px]',
  }
  const guestTG = userId !== 'host'
  const garnishOpen = dDay !== undefined && dDay >= 0
  const GarnishDetailMoveToBtnHandler = (garnishId: number) => {
    if (guestTG && !garnishOpen && !guestTG) {
      // 공유떡국 + 디데이 전
      toast({ description: '편지 확인은 02/09까지 기다려 주세요.' })
      return
    }
    if (guestTG && Public && garnishOpen) {
      // 공유떡국 + 공개 + 디데이 후 -> 해당 편지 페이지로 이동
      window.location.href = `/${userId}/${garnishId}`
      return
    }
    if (guestTG && !Public && garnishOpen) {
      // 공유떡국 + 비공개 + 디데이 후
      toast({ description: '편지 내용은 떡국 주인만 볼 수 있어요!' })
      return
    }
    if (!guestTG && !Public && garnishOpen) {
      // 내떡국 + 디데이 후
      window.location.href = `/${userId}/${garnishId}`
      return
    }
  }

  return (
    <>
      {garnishInfo?.map((item: GarnishItem, idx: number) => (
        <div
          key={item.garnishId}
          className={` absolute text-center ${garnishLocation[idx]} flex cursor-pointer flex-col`}
          onClick={() => GarnishDetailMoveToBtnHandler(item.garnishId)}
        >
          <div className={`h-54 w-54 `}>
            <Image
              width={54}
              height={54}
              src={`/images/garnishes/${item.garnishType}.png`}
              alt="garnish"
            />
          </div>
          <p className="font-xs">{item.nickname}</p>
        </div>
      ))}
    </>
  )
}

export default Garnish
