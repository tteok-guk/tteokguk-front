'use client'
import React, { useState } from 'react'
import { TopButton } from '@/components/common'
import { Textarea } from '@/components/ui/textarea'
import { iconError } from '../../../../public/images/icons'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { BottomButton } from '@/components/common'
import { useMutation } from '@tanstack/react-query'
import { deleteNickname } from '@/services/withdrawal'
import { useRouter, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'

function WithdrawalPage() {
  const params = useSearchParams()
  const hostNickname = params.get('nickname')
  const [disabled, setDisabled] = useState(false)
  const router = useRouter()

  const onChangeMatt = useMutation({
    mutationFn: () => deleteNickname(),
    onSuccess: (res) => {
      Cookies.remove('token')
      router.push('/')
    },
    onError: (err) => console.log('err', err),
  })

  const completeBtn = () => {
    onChangeMatt.mutate()
  }

  return (
    <>
      <div className="content-height">
        <TopButton />
        <p className="font-xl">
          {hostNickname}님
          <br />
          정말 탈퇴하시겠습니까?
        </p>
        <div className="item-center mt-10 flex gap-4">
          <Image src={iconError} alt="경고 아이콘" width={20} height={20} />
          <span className="font-sm text-pr-500">
            탈퇴 후에는 내떡국과 받은 덕담이 모두 삭제돼요.
          </span>
        </div>
        <Textarea
          placeholder={'떠나시는 이유를 알려주세요!\n더 나은 서비스로 돌아오겠습니다.(선택)'}
        />
        <div className="item-center flex gap-5">
          <Checkbox
            className={
              'h-24 w-24 rounded-md border-2 border-pr-200 bg-white bg-center data-[state=checked]:border-0 data-[state=checked]:bg-pr-500 data-[state=checked]:bg-[url(/images/icons/check.png)] data-[state=checked]:bg-no-repeat'
            }
            onClick={() => {
              setDisabled(!disabled)
            }}
          />
          <span className="font-xs">데이터가 모두 삭제됨을 확인하였으며 동의합니다.</span>
        </div>
      </div>
      <BottomButton
        fullBtnName={`회원 탈퇴`}
        fullBtnDisabled={!disabled}
        fullBtnClick={completeBtn}
      />
    </>
  )
}

export default WithdrawalPage
