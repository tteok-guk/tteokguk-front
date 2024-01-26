import React from 'react'
import Image from 'next/image'
import { cryingAvatars } from '../../../public/images/avatar'

import SetRouteButton from '../SetRouteButton'

export default async function Error({ type = '404' }: { type?: string }) {
  const title = type === 'error' ? '빈 페이지를 발견하셨어요!' : '길을 잃으셨어요!'
  const desc =
    type === 'error'
      ? '요청하신 데이터가 존재하지 않거나\n유효하지 않아요!'
      : '페이지의 주소가 잘못 입력되었거나\n변경 및 삭제되어 사용할 수 없어요!'

  return (
    <section className="flex-center h-full flex-col gap-90">
      <div className="flex-center flex-col gap-12">
        <h1 className="text-28 font-bold leading-36 text-pr-500 lg:text-34">{title}</h1>
        <p className="whitespace-pre-line text-center text-12 leading-15 text-gr-400 lg:text-14 lg:leading-17">
          {desc}
        </p>
      </div>
      <Image src={cryingAvatars} alt="울고 있는 캐릭터 일러스트" priority />
      <SetRouteButton />
    </section>
  )
}
