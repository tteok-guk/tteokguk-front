'use client'

import { TopButton } from '@/components/common'
import Partition from '@/components/common/Partition'
import { getMyPage } from '@/services/accout'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { iconArrow2, iconLink, iconMail, iconTeam, iconCs } from '../../../public/images/icons'

export default function SideBar() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['myPageInfo'],
    queryFn: getMyPage,
  })
  console.log('data', data)

  const route = useRouter()

  const nickname = data?.data.nickname ?? '로그인 후 내떡국 만들기'
  const id = data?.data.tteokGukId
  return (
    <div>
      <TopButton />
      <div className="mb-20 flex gap-8">
        <h2 className="text-2xl font-semibold">{nickname}</h2>
        <button
          onClick={() => {
            data?.data.nickname ? route.push('/account') : route.push('/')
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
          <Link href={`/${id}/garnish-list`}>
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
        <button className="flex items-center gap-6">
          <Image src={iconTeam} alt="mypage enter btn" width={20} height={20} />
          <p className="font-base">팀소개</p>
        </button>
        <button className="flex items-center gap-6">
          <Image src={iconCs} alt="mypage enter btn" width={20} height={20} />
          <p className="font-base">CS | 문의</p>
        </button>
      </div>
      <Partition />
      <div className="h-14 w-135">
        <span className="font-xs relative mr-10 text-gr-400 after:absolute after:-right-6 after:top-0 after:h-full after:w-2 after:bg-gray-400 after:content-['']">
          이용약관
        </span>
        <span className="font-xs text-gr-400">개인정보 수집이용</span>
      </div>
    </div>
  )
}
