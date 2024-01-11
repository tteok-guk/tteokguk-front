'use client'
import React, { useState } from 'react'
import { TopButton } from '@/components/common'
import { Textarea } from '@/components/ui/textarea'
import { iconError } from '../../../../public/images/icons'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { BottomButton } from '@/components/common'

function WithdrawalPage() {
  const [disabled, setDisabled] = useState(false)

  return (
    <>
      <TopButton />
      <p className="font-xl">
        닉네임닉네임닉네임
        <br />
        정말 탈퇴하시겠습니까?
      </p>
      <div className="item-center mt-10 flex gap-4">
        <Image src={iconError} alt="경고 아이콘" width={18} height={18} />
        <span className="font-sm text-pr-500">탈퇴 후에는 내떡국과 받은 덕담이 모두 삭제돼요.</span>
      </div>
      <Textarea />
      <div className="item-center flex gap-5">
        <Checkbox />
        <span className="font-xs">데이터가 모두 삭제됨을 확인하였으며 동의합니다.</span>
      </div>
      <BottomButton
        split="twice"
        smallBtnName={`취소`}
        // smallBtnDisabled={!disabled}
        fullBtnName={`회원 탈퇴`}
        fullBtnDisabled={!disabled}
      />
    </>
  )
}

export default WithdrawalPage
