'use client'
import { GarnishType } from '@/app/[userId]/page'
import React from 'react'

const Garnish = () => {
  const GarnishInfo = {
    id: 'my',
    nickname: '공주',
    디데이: 30,
    편지총개수: 7,
    고명정보: [
      { 고명식별자: 123, 닉네임: '나는공주다', 고명키값: '딸기' },
      { 고명식별자: 456, 닉네임: '한솔띠', 고명키값: '고수' },
      { 고명식별자: 789, 닉네임: '이건일곱글자로', 고명키값: '오이' },
      { 고명식별자: 124, 닉네임: '희제님바보', 고명키값: '페퍼론치노' },
      { 고명식별자: 125, 닉네임: '지각생주영님', 고명키값: '파' },
      { 고명식별자: 126, 닉네임: '떡국기원', 고명키값: '계란' },
      { 고명식별자: 127, 닉네임: '대박나자!!!', 고명키값: '고기' },
    ],
    총페이지수: 1,
    테이블매트정보: 'red',
    인입유저떡국설정완료여부: true,
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

  return (
    <>
      {GarnishInfo?.고명정보.map((item, idx) => (
        <div
          key={item.고명식별자}
          className={` absolute text-center ${garnishLocation[idx]} flex flex-col `}
        >
          <div
            className={`h-54 w-54  rounded-full bg-[url(/images/${item.고명키값}.png)] bg-cover bg-center`}
          >
            {item.고명키값}
          </div>
          <p className="font-xs">{item.닉네임}</p>
        </div>
      ))}
    </>
  )
}

export default Garnish
