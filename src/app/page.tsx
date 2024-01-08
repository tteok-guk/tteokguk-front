'use client'

import { Button } from '@/components/ui/button'

export default function AuthPage() {

  const kakaoLink = 'https://api.tteok-guk.store/oauth2/authorization/kakao'

  const loginHandler = () => {
    // window.loacation.href 사용
    const stateData = '?state=test'
    // window.location.href = `${kakaoLink}${cookieData2}`
    window.location.href = `${kakaoLink}`
  
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
        <div className="fixed bottom-0 left-0 h-117 w-full">
          <div className={`mx-auto flex h-full min-w-320 max-w-575 justify-center bg-bg px-20 pt-16`}>
            
            <Button size="full" className="border bg-[#FFE42D] border-[#FFE42D] text-[#181818] text-17 font-semibold leading-22" onClick={loginHandler}>
              <div className='mr-8'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 25 22" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7021 19.5233C19.4411 19.5233 24.9042 15.1529 24.9042 9.76167C24.9042 4.37045 19.4411 0 12.7021 0C5.96306 0 0.5 4.37045 0.5 9.76167C0.5 12.9743 2.43995 15.8245 5.43384 17.6034C5.61551 17.7113 5.71613 17.9183 5.68139 18.1267L5.14724 21.3316C5.07795 21.7474 5.52256 22.0571 5.8885 21.848L10.1371 19.4202C10.2362 19.3636 10.3516 19.3428 10.4645 19.3596C11.1899 19.4671 11.9378 19.5233 12.7021 19.5233Z" fill="#181818"/>
                </svg>
              </div>
              카카오로 시작하기
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}


