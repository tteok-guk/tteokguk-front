'use client'
import React from 'react'
import { TopButton } from '@/components/common'
import Partition from '@/components/common/Partition'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getMyPage } from '@/services/accout'

//todo 1. 수정하기기능
//todo 2. 회원탈퇴기능
//todo 3. 로그아웃 팝업 및 로그아웃 기능
//todo 4. 슬라이드 기능

function MyPage() {
  //? React Query v5에서 query 함수 호출 시 새로운 형식을 사용해야된다
  //? query 함수 호출시 Object형태만 허용된다. exuseQuery({queryKey: ['myPageInfo'],queryFn: getMyPage,})
  //? "queryKey" 속성은 쿼리의 고유 키를 나타내며 queryKey는 타입이 필요한데 "배열" 혹은 "함수"의 형태를 갖는다
  //? "queryFn" 실제 쿼리 함수를 나타낸다.

  const { isLoading, error, data } = useQuery({
    queryKey: ['myPageInfo'],
    queryFn: getMyPage,
  })

  console.log(data?.data.public)
  return (
    <>
      <TopButton />
      <span className="text-xs text-gr-400">닉네임</span>
      <div className="flex items-center justify-between">
        <p className="font-xl">{data?.data.nickname}</p>
        <button className="h-24 w-64 rounded-full border-1 border-gray-400 text-xs">
          수정하기
        </button>
      </div>
      <Partition />
      <span className="text-xs text-gr-400">편지 개수 및 내용</span>
      <div className="flex items-center justify-between">
        <p className="font-base">공개범위</p>
        <p className="text-xs text-gr-400">
          {data?.data.public === true ? '전체공개' : '나만보기'}
        </p>
      </div>
      <Partition />
      <span className="text-xs text-gr-400">로그인 관리</span>
      <div className="">
        {/* 로그아웃은 button 회원탈퇴는 Link로 변경 */}
        <p className="font-base mb-16">로그아웃</p>
        <Link href={'/'} className="font-base">
          회원탈퇴
        </Link>
      </div>
    </>
  )
}

export default MyPage
