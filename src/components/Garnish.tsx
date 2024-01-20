'use client'

import { toast } from '@/hooks/use-toast'
import { GarnishItem, GarnishLocationType, GarnishType } from '@/types/MainPageTypes'
import Image from 'next/image'

const Garnish = ({ garnishInfo, Public, dDay, userId }: GarnishType) => {
  const garnishLocation: GarnishLocationType = {
    0: 'top-[39.33%] left-[41%]',
    1: 'top-[25.33%] left-[17%]',
    2: 'top-[11.33%] left-[40.67%]',
    3: 'top-[25.33%] left-[64.67%]',
    4: 'top-[53%] left-[17%]',
    5: 'top-[66.67%] left-[40.67%]',
    6: 'top-[52.33%] left-[64.67%]',
  }
  const guestTG = userId !== 'host'
  const garnishOpen = dDay !== undefined && dDay >= 0
  const GarnishDetailMoveToBtnHandler = (garnishId: number) => {
    if (!garnishOpen) {
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
      toast({ description: '이 떡국의 편지내용은 주인만 볼 수 있어요!' })
      return
    }
    if (!guestTG && garnishOpen) {
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
          <div className={` h-54 w-54 lg:h-80 lg:w-80`}>
            <Image
              width={80}
              height={80}
              src={`/images/garnishes/${item.garnishType ? item.garnishType : 'basicRc'}.png`}
              alt="garnish"
            />
          </div>
          <p className="font-xs font-soyo">{item.nickname}</p>
        </div>
      ))}
    </>
  )
}

export default Garnish
