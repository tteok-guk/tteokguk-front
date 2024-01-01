'use client'

import { BottomButton, TopButton } from '@/components/common'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

// todo1.
// http://localhost:3000/hansol/write?garnish=egg 이거
// 주소에만 write로 보이고 실 데이터는 write?garnish=egg 다 받아올 수 있는지

// todo2.
// host nickname 어디에 어떻게 저장되는건지,
// 저장되지 않는다면 쿼리스트링으로 밀어넣어서 받을지 고민해보기

export default function WritePage() {
  const [garnish, setGarnish] = useState('')

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // todo3. garnish param이 정해진 고명이 아닐 경우 추가
    const getChosenGarnish = searchParams.get('garnish')
    if (!getChosenGarnish) {
      const userId = pathname.split('/').filter((item) => item)[0]
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
      <p className="font-sm pb-12 pt-8 text-gr-300">
        욕설, 비방, 성희롱, 음란성 메세지 등 경고 문구
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
      <BottomButton fullBtnName="완료" />
    </div>
  )
}
