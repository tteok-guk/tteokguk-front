'use client'

import { BottomButton } from '@/components/common'
export default function AuthPage() {
  // 메인 화면
  // [TODO] 메인의 폰트 경우 사이즈가 없어서  테일윈드 기본 클래스로 처리 추후 사이즈 생길 경우 공통화

  const testHandler = () => {
    alert('TEST')
  }

  return (
    <>
    {/* 상단 서비스 타이틀 */}
    <div className='flex flex-col-reverse items-center gap-y-10 pt-26'>
      <h1 className='font-soyo font-bold text-40 leading-[52px] flex flex-col'>
        <span className='text-pr-500'>니떡국</span>
        <span className='text-pr-300'>내떡국</span>
      </h1>
      <h2 className='text-17 font-semibold leading-[22px]'>고명에 마음을 담았어요!</h2>
    </div>
    {/* 이미지 영역 */} 
    <div>
      <div>캐릭터영역</div>
    </div>
    {/* 하단 */}
    <div>
      <BottomButton fullBtnHref="/" fullBtnName='카카오로 시작하기' fullBtnClick={testHandler}/>
    </div>
    </>
  )
}
