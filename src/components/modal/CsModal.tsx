import Image from 'next/image'
import React from 'react'
import { iconClose } from '../../../public/images/icons'
import { userTest } from '../../../public/images/avatar'
import Link from 'next/link'

interface CsProps {
  cancelBtnFn?: () => void
}

function CsModal({ cancelBtnFn }: CsProps) {
  return (
    <div className="modal-bg">
      <div className="modal-wrapper">
        <div className="flex items-end">
          <div className="relative w-dvw rounded-t-2xl bg-white px-20 py-40">
            <button className="absolute right-20 top-20" onClick={cancelBtnFn}>
              <Image src={iconClose} alt="닫기 버튼" width={20} height={20} />
            </button>
            <div className="flex-center mb-20 mt-10 flex-col gap-5">
              <h1 className="text-xl font-semibold text-black">문의사항이 생기셨나요?</h1>
              <h2>궁금하거나 불편한 사항을 남겨주세요!</h2>
            </div>
            <button className="h-60 w-full rounded-md bg-pr-500 text-lg text-white">
              <Link href={'https://forms.gle/KEcBmqZeZBt2kU5x7'} target="_blank">
                문의하기
              </Link>
            </button>
            {/* <div className="flex-center mt-12">
              <button className="w-100 text-pr-400" onClick={confirmBtnFn}>
                다시 보지 않기
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CsModal
