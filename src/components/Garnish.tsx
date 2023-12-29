'use client'
import { GarnishType } from '@/app/[userId]/page'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'
import React from 'react'

const Garnish = () => {
  const GarnishInfo = {
    id: 'host',
    nickname: '공주',
    dDay: 30,
    garnishCnt: 7,
    garnish: [
      { garnishId: 123, nickname: '나는공주다', garnishName: 'cucumber' },
      { garnishId: 456, nickname: '한솔띠', garnishName: 'cucumber' },
      { garnishId: 789, nickname: '이건일곱글자로', garnishName: 'cucumber' },
      { garnishId: 124, nickname: '희제님바보', garnishName: 'cucumber' },
      { garnishId: 125, nickname: '지각생주영님', garnishName: 'seaweed' },
      { garnishId: 126, nickname: '떡국기원', garnishName: 'mushroom' },
      { garnishId: 127, nickname: '대박나자!!!', garnishName: 'riceCake' },
    ],
    lastPageNum: 1,
    mattId: 'red',
    isPublic: true,
  }

  const garnishLocation: GarnishType = {
    0: 'top-[39px] left-[122px]',
    1: 'top-[81px] left-[51px]',
    2: 'top-[123px] left-[122px]',
    3: 'top-[81px] left-[194px]',
    4: 'top-[164px] left-[51px]',
    5: 'top-[205px] left-[122px]',
    6: 'top-[164px] left-[194px]',
  }
  const GarnishDetailMoveToBtnHandler = () => {
    toast({ description: '편지 확인은 02/09까지 기다려 주세요.' })
  }
  return (
    <>
      {GarnishInfo?.garnish.map((item, idx) => (
        <div
          key={item.garnishId}
          className={` absolute text-center ${garnishLocation[idx]} flex flex-col `}
          onClick={GarnishDetailMoveToBtnHandler}
        >
          {/* <div
                  className={`h-54 w-54  rounded-full bg-[url('/images/seaweed.png')] bg-cover bg-center`}
                > */}
          <div className={`h-54 w-54 `}>
            <Image width={54} height={54} src={`/images/${item.garnishName}.png`} alt="garnish" />
          </div>
          <p className="font-xs">{item.nickname}</p>
        </div>
      ))}
    </>
  )
}

export default Garnish
