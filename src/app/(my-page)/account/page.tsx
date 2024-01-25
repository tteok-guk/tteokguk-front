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
import {
  iconArrow2,
  iconLink,
  iconMail,
  iconTeam,
  iconCs,
  iconUserTest,
} from '../../../../public/images/icons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

//? React Query v5에서 query 함수 호출 시 새로운 형식을 사용해야된다
//? query 함수 호출시 Object형태만 허용된다. exuseQuery({queryKey: ['myPageInfo'],queryFn: getMyPage,})
//? "queryKey" 속성은 쿼리의 고유 키를 나타내며 queryKey는 타입이 필요한데 "배열" 혹은 "함수"의 형태를 갖는다
//? "queryFn" 실제 쿼리 함수를 나타낸다.

function MyPage() {
  const queryClient = useQueryClient()
  const [modifyBtn, setModifyBtn] = useState(false)
  const [logout, setlogout] = useState(false)
  const [showModal, setShowModal] = useState(true)
  const [cs, setCs] = useState(false)
  const [mypageToggle, setMypageToggle] = useState(false)
  const route = useRouter()

  useEffect(() => {
    const hideModal = Cookies.get('hideModal')
    if (hideModal) {
      setShowModal(false)
    }
  }, [])

  const hideModalForADay = () => {
    Cookies.set('hideModal', 'true', { expires: 1 })
    setShowModal(false)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const LogoutHandler = () => {
    Cookies.remove('token')
    setlogout(!logout)
    window.location.href = `/`
  }

  const mypageHandler = () => {
    setMypageToggle(!mypageToggle)
  }

  const csModalToggle = () => {
    setCs(!cs)
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
  const nickname = data?.data.nickname ?? '로그인 후 내떡국 만들기'
  const id = data?.data.tteokGukId

  console.log('datadatadatadatadatadatadatadata', data?.data.tteokGukId)

  const homeRoute = () => {
    window.location.href = `/${data?.data.tteokGukId}?page=1`
  }

  const [onChangeInputValue, setOnChangeInputValue] = useState<string>('')
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const filteredValue = inputValue.replace(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g, '')
    if (filteredValue.length <= 8) {
      setOnChangeInputValue(filteredValue)
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
    setOnChangeInputValue('')
  }
  return (
    <>
      {!mypageToggle ? (
        <div>
          {showModal && (
            <Modal type="userTest" cancelBtnFn={closeModal} confirmBtnFn={hideModalForADay} />
          )}
          {cs && <Modal type="cs" cancelBtnFn={csModalToggle} />}
          {data?.data.nickname ? <TopButton onClick={homeRoute} /> : <TopButton />}
          <div className="mb-20 flex gap-8">
            <h2 className="text-2xl font-semibold">{nickname}</h2>
            <button
              onClick={() => {
                data?.data.nickname ? mypageHandler() : route.push('/')
              }}
            >
              <Image src={iconArrow2} alt="mypage enter btn" width={24} height={24} />
            </button>
          </div>
          {data?.data.nickname ? (
            <div className="flex-center mb-20 h-114 w-full gap-42 rounded bg-pr-100">
              <Link href={`/${id}?page=1`}>
                <Image
                  src={iconLink}
                  alt="myttukguk enter btn"
                  width={48}
                  height={48}
                  className="m-auto mb-8 rounded-full"
                />
                <p className="font-sm">내떡국 바로가기</p>
              </Link>
              <Link href={`/host/garnish-list`}>
                <Image
                  src={iconMail}
                  alt="mypage enter btn"
                  width={48}
                  height={48}
                  className="m-auto mb-8 rounded-full"
                />
                <p className="font-sm">받은 편지함</p>
              </Link>
            </div>
          ) : null}
          <div className="flex flex-col gap-16">
            <Link
              className="flex items-center gap-6"
              href={'https://forms.gle/oavk3yJND7A8JrMh7'}
              target="_blank"
            >
              <Image src={iconUserTest} alt="mypage enter btn" width={20} height={20} />
              <p className="font-base">유저테스트 참여하기</p>
            </Link>
            <Link
              className="flex items-center gap-6"
              href={'https://tteokguk.notion.site/6a5ab7200f6d434aaf7c7524d889ef8a?pvs=4'}
              target="_blank"
            >
              <Image src={iconTeam} alt="mypage enter btn" width={20} height={20} />
              <p className="font-base">팀소개</p>
            </Link>
            <button className="flex items-center gap-6" onClick={csModalToggle}>
              <Image src={iconCs} alt="mypage enter btn" width={20} height={20} />
              <p className="font-base">CS | 문의</p>
            </button>
          </div>
          <Partition />
          <div className="h-14 w-135">
            <Link
              href={'https://tteokguk.notion.site/5e0171c5524446ea84b5f2ffc2cb39b1?pvs=4'}
              className="font-xs relative mr-10 text-gr-400 after:absolute after:-right-6 after:top-0 after:h-full after:w-2 after:bg-gray-400 after:content-['']"
              target="_blank"
            >
              이용약관
            </Link>
            <Link
              href={'https://tteokguk.notion.site/87fde28ebf8940bb85576e1a68563d10?pvs=4'}
              className="font-xs text-gr-400"
              target="_blank"
            >
              개인정보 수집이용
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <TopButton onClick={mypageHandler} />
          <span className="text-xs text-gr-400">닉네임</span>
          <div className="flex items-center justify-between">
            {!modifyBtn ? (
              <p className="font-xl">{data?.data.nickname}</p>
            ) : (
              <input
                className="font-xl relative h-32 bg-transparent outline-none"
                type="text"
                value={onChangeInputValue}
                onChange={(e) => {
                  onChangeHandler(e)
                }}
                placeholder={data?.data.nickname}
                // ref={inputFocus}
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
                className="absolute right-20 h-24 w-64 rounded-full border-1 border-pr-500 text-xs text-pr-500"
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
        </div>
      )}
    </>
  )
}

export default MyPage
