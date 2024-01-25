import React from 'react'
import Image from 'next/image'
import { ErrorType } from '@/types/CommonTypes'
import { Button } from '../ui/button'
import { cryingAvatars } from '../../../public/images/avatar'

export default function Error({ type = '404' }: ErrorType) {
  const title = type === 'error' ? '빈 페이지를 발견하셨어요!' : '길을 잃으셨어요!'
  const desc =
    type === 'error'
      ? '요청하신 데이터가 존재하지 않거나\n유효하지 않아요!'
      : '페이지의 주소가 잘못 입력되었거나\n변경 및 삭제되어 사용할 수 없어요!'

  return (
    <section className="flex-center h-full flex-col gap-90">
      <div className="flex-center flex-col gap-12">
        <h1 className="text-28 font-bold leading-36 text-pr-500 lg:text-34">{title}</h1>
        <p className="whitespace-pre-line text-12 leading-15 text-gr-400 lg:text-14 lg:leading-17">
          {desc}
        </p>
      </div>
      <Image src={cryingAvatars} alt="울고 있는 캐릭터 일러스트" priority />
      {/* // todo 로그인 및 게스트 구분에 따른 링크 분기 처리 */}
      <Button
        href={'/'}
        className="rounded-full bg-pr-500 px-36 py-12 text-14 font-semibold text-white "
      >
        메인으로 이동하기
      </Button>
    </section>
  )
}
