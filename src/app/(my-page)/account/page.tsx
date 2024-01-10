import React from 'react'
import { TopButton } from '@/components/common'
import Partition from '@/components/common/Partition'

function MyPage() {
  return (
    <>
      <TopButton />
      <span className="text-xs text-gr-400">닉네임</span>
      <div className="flex items-center justify-between">
        <p className="font-xl">닉네임닉네임닉네임</p>
        <button className="h-24 w-64 rounded-full border-1 border-gray-400 text-xs">
          수정하기
        </button>
      </div>
      <Partition />
      <span className="text-xs text-gr-400">편지 개수 및 내용</span>
      <div className="flex items-center justify-between">
        <p className="font-base">공개범위</p>
        <p className="text-xs text-gr-400">수정하기</p>
      </div>
      <Partition />
      <span className="text-xs text-gr-400">로그인 관리</span>
      <div className="">
        {/* 로그아웃은 button 회원탈퇴는 Link로 변경 */}
        <p className="font-base mb-16">로그아웃</p>
        <p className="font-base">회원탈퇴</p>
      </div>
    </>
  )
}

export default MyPage
