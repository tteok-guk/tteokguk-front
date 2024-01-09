'use client'

import { BottomButton, TopButton } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { garnishes } from '../../../../../data/garnishes'
import { isMobileDevice } from '@/utils/isMobileDevice'

// todo1.
// http://localhost:3000/hansol/write?garnish=egg 이거
// 주소에만 write로 보이고 실 데이터는 write?garnish=egg 다 받아올 수 있는지

// todo2.
// host nickname 어디에 어떻게 저장되는건지,
// 저장되지 않는다면 쿼리스트링으로 밀어넣어서 받을지 고민해보기

export default function WritePage() {
  const pathname = usePathname()
  const params = useSearchParams()
  const router = useRouter()
  const isMoblie = isMobileDevice()

  const getChosenGarnish = params.get('garnish')
  const validGarnish = garnishes.find((garnish) => garnish.id === getChosenGarnish)
  const userId = pathname.split('/').filter((item) => item)[0]

  useEffect(() => {
    if (!validGarnish) {
      router.push(`/${userId}/set-garnish`)
    }
  }, [])

  return (
    <div className="">
      <TopButton />
      <h1 className="font-xl pt-12">
        닉네임닉네임닉네임에게
        <br />
        덕담을 남겨주세요!
      </h1>
      <p className="font-xs pb-12 pt-8 text-gr-300">
        욕설/비방/음란 메시지는 이용 제한이 있을 수 있어요.
      </p>
      <form>
        <div className="relative">
          <Input
            className="placeholder:font-sm rounded-4 border-none bg-pr-100 px-24 py-16 font-soyoThin placeholder:text-pr-300"
            placeholder="떡국에 남겨질 닉네임을 입력해주세요"
            maxLength={8}
          />
          {/* // todo4. 글자수 카운트 별도 컴포넌트로 분리 */}
          <span className="font-sm absolute bottom-15 right-24 text-[#4B4B4B]">{`0/8`}</span>
        </div>
        <div className="relative">
          <Textarea
            className="placeholder:font-sm my-16 font-soyoThin placeholder:text-pr-300"
            placeholder="덕담으로 행복한 새해를 선물해 주세요!"
            maxLength={700}
          />
          <span className="font-sm absolute bottom-15 right-24 text-[#4B4B4B]">{`0/700`}</span>
        </div>
      </form>

      {isMoblie ? (
        <Button size="full" className="mt-16">
          완료
        </Button>
      ) : (
        <BottomButton fullBtnName="완료" />
      )}
    </div>
  )
}
