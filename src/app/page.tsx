'use client'

import { useMutation} from '@tanstack/react-query'
import { BottomButton } from '@/components/common'


export default function AuthPage() {

  const kakaoLink = 'https://api.tteok-guk.store/oauth2/authorization/kakao'

  // 뮤테이션
  const kakaoMutation = useMutation({
    mutationFn: () => {
      const response = fetch(kakaoLink)
      console.log("response,", response)
      return response
    },
    onSuccess: (data) => {
      console.log("mutation success");
    },
  })

  const kakaoLoginHandler = () => {
    // reactQuer 뮤테이션 사용
    kakaoMutation.mutate()
  }

  const loginHandler = () => {
    // window.loacation.href 사용
    window.location.href = kakaoLink;
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
        <BottomButton 
          split='twice' 
          smallBtnClick={loginHandler} 
          smallBtnName='href'  
          fullBtnName='mutation' 
          fullBtnClick={kakaoLoginHandler}/>
      </div>
    </>
  )
}


