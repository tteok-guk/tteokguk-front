import Image from 'next/image'
import React from 'react'
import { iconClose } from '../../../public/images/icons'
import { userTest } from '../../../public/images/avatar'
import Link from 'next/link'

interface UserTestProps {
  cancelBtnFn?: () => void
  confirmBtnFn?: () => void
}

function UserTestModal({ cancelBtnFn, confirmBtnFn }: UserTestProps) {
  return (
    <div className="modal-bg">
      <div className="relative mx-auto flex h-full min-w-320 max-w-575 items-end">
        <div
          className="absolute bottom-0 right-0 top-0 w-full cursor-pointer bg-black bg-opacity-70"
          onClick={cancelBtnFn}
        ></div>
        <div className="relative bottom-0 w-full rounded-t-2xl bg-pr-200 p-20">
          <button className="absolute right-20 top-20" onClick={cancelBtnFn}>
            <Image src={iconClose} alt="닫기 버튼" width={20} height={20} />
          </button>
          <div className="mt-30 p-20">
            <Image src={userTest} alt="유저테스트 캐릭터" loading="eager" />
          </div>
          <div className="flex-center mt-12">
            <button className="w-100 text-pr-400" onClick={confirmBtnFn}>
              다시 보지 않기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserTestModal
