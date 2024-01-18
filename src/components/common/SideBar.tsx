'use client'
import Image from 'next/image'
import { iconMypage, iconArrow2 } from '../../../public/images/icons'
import { TopButton } from '@/components/common'
import Link from 'next/link'
import Partition from './Partition'

export default function SideBar() {
  return (
    <div>
      <TopButton />
      <div className="mb-20 flex gap-8">
        {/* 로그인 안했을 때 */}
        {/* <h2 className="text-2xl font-semibold">로그인 후 내떡국 만들기</h2> */}
        <h2 className="text-2xl font-semibold">닉네임닉네임닉네임</h2>
        <button>
          <Image src={iconArrow2} alt="mypage enter btn" width={24} height={24} />
        </button>
      </div>
      <div className="flex-center mb-20 h-114 w-full gap-42 rounded bg-pr-100">
        <button>
          {/*button태그 Link태그로 바꿀예정*/}
          <Image
            src={iconMypage}
            alt="myttukguk enter btn"
            width={48}
            height={48}
            className="m-auto rounded-full"
          />
          <p className="font-sm">내떡국 바로가기</p>
        </button>
        <button>
          {/*button태그 Link태그로 바꿀예정*/}
          <Image
            src={iconMypage}
            alt="mypage enter btn"
            width={48}
            height={48}
            className="m-auto rounded-full"
          />
          <p className="font-sm">받은 편지함</p>
        </button>
      </div>
      <div className="flex flex-col gap-16">
        <button className="flex items-center gap-6">
          <Image
            src={iconMypage}
            alt="mypage enter btn"
            width={48}
            height={48}
            className="rounded-full"
          />
          <p className="font-base">팀소개 링크</p>
        </button>
        <button className="flex items-center gap-6">
          <Image
            src={iconMypage}
            alt="mypage enter btn"
            width={48}
            height={48}
            className="rounded-full"
          />
          <p className="font-base">CS링크</p>
        </button>
      </div>
      <Partition />
      <div className="h-14 w-135">
        {/* Link태그로 바꿔야함 */}
        <span className="font-xs relative mr-10 text-gr-400 after:absolute after:-right-6 after:top-0 after:h-full after:w-2 after:bg-gray-400 after:content-['']">
          이용약관
        </span>
        <span className="font-xs text-gr-400">개인정보 수집이용</span>
      </div>
    </div>
  )
}
