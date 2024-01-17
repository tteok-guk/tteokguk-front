'use client'

import { useRecoilState } from 'recoil'
import { ToastState } from '@/store/ToastAtom'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/common'

export default function SampleToastPage() {
  const [isToast, setIsToast] = useRecoilState(ToastState)

  const onClick = () => {
    setIsToast({ open: true, msg: '메세지를 적어주세요' })
  }

  return (
    <>
      <Button onClick={onClick} className="bg-pr-500 p-10 text-white">
        클릭하면 토스트 열림
      </Button>
      {isToast.open && <Modal type="toast" />}
    </>
  )
}
