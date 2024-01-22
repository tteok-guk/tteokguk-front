'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Modal, TopButton } from '@/components/common'
import Partition from '@/components/common/Partition'
import Link from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyPage } from '@/services/accout'
import { RequestParamType } from '@/types/apiTypes'
import { putNickname } from '@/services/modifyNickname'
import Cookies from 'js-cookie'

//? React Query v5에서 query 함수 호출 시 새로운 형식을 사용해야된다
//? query 함수 호출시 Object형태만 허용된다. exuseQuery({queryKey: ['myPageInfo'],queryFn: getMyPage,})
//? "queryKey" 속성은 쿼리의 고유 키를 나타내며 queryKey는 타입이 필요한데 "배열" 혹은 "함수"의 형태를 갖는다
//? "queryFn" 실제 쿼리 함수를 나타낸다.

function MyPage() {
  const queryClient = useQueryClient()
  const [modifyBtn, setModifyBtn] = useState(false)
  const [logout, setlogout] = useState(false)

  const LogoutHandler = () => {
    Cookies.remove('token')
    setlogout(!logout)
  }
  const logoutModalToggle = () => {
    setlogout(!logout)
  }
  const inputFocus = useRef<any>(null)
  useEffect(() => {
    inputFocus.current?.focus()
  }, [modifyBtn])

  const { isLoading, error, data } = useQuery({
    queryKey: ['myPageInfo'],
    queryFn: getMyPage,
  })

  console.log(data?.data.public)

  const [onChangeInputValue, setOnChangeInputValue] = useState<string>('')
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (inputValue.length <= 8) {
      setOnChangeInputValue(inputValue)
    }
  }
  console.log('onChangeInputValue', onChangeInputValue)

  const onChangeNickname = useMutation({
    mutationFn: (onChangeInputValue: RequestParamType) => putNickname(onChangeInputValue),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['myPageInfo'] })
      console.log('res', res)
    },
    onError: (err) => console.log('err', err),
  })

  const completeBtn = () => {
    onChangeNickname.mutate({ nickname: onChangeInputValue })
  }
  return (
    <>
      <TopButton />
      <span className="text-xs text-gr-400">닉네임</span>
      <div className="flex items-center justify-between">
        {!modifyBtn ? (
          <p className="font-xl">{data?.data.nickname}</p>
        ) : (
          <input
            className="font-xl h-32 bg-transparent outline-none"
            type="text"
            value={onChangeInputValue}
            onChange={(e) => {
              onChangeHandler(e)
            }}
            ref={inputFocus}
          ></input>
        )}
        {!modifyBtn ? (
          <button
            className="h-24 w-64 rounded-full border-1 border-gray-400 text-xs"
            onClick={() => {
              setModifyBtn(!modifyBtn)
            }}
          >
            수정하기
          </button>
        ) : (
          <button
            className="h-24 w-64 rounded-full border-1 border-pr-500 text-xs text-pr-500"
            onClick={() => {
              completeBtn()
              setModifyBtn(!modifyBtn)
            }}
          >
            수정완료
          </button>
        )}
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
        <button className="font-base mb-16 block" onClick={logoutModalToggle}>
          로그아웃
        </button>
        <Link href={`/withdrawal?nickname=${data?.data.nickname}`} className="font-base">
          회원탈퇴
        </Link>
        {logout && (
          <Modal
            type="logout"
            title="로그아웃 하시겠습니까?"
            cancelBtnTitle="취소"
            confirmTitle="로그아웃"
            cancelBtnFn={logoutModalToggle}
            confirmBtnFn={LogoutHandler}
          />
        )}
      </div>
    </>
  )
}

export default MyPage
