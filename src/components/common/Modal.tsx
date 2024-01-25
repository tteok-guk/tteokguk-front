'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { ModalProps, ModalComponentType } from '@/types/CommonTypes'
import { RouletteModal, LogoutModal, UserTestModal, CsModal } from '../modal'

export default function Modal({
  type,
  cancelClick,
  title,
  cancelBtnTitle,
  confirmTitle,
  cancelBtnFn,
  confirmBtnFn,
}: ModalProps) {
  const [mounted, setMounted] = useState(false)

  const componentType: ModalComponentType = {
    roulette: <RouletteModal cancelClick={cancelClick} />,
    logout: (
      <LogoutModal
        title={title}
        cancelBtnTitle={cancelBtnTitle}
        confirmTitle={confirmTitle}
        cancelBtnFn={cancelBtnFn}
        confirmBtnFn={confirmBtnFn}
      />
    ),
    userTest: <UserTestModal cancelBtnFn={cancelBtnFn} confirmBtnFn={confirmBtnFn} />,
    cs: <CsModal cancelBtnFn={cancelBtnFn} />,
  }
  const componentToRender = componentType[type]
  const modalRoot = document.getElementById('modal-root') as HTMLElement

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return mounted ? (
    createPortal(componentToRender, document.getElementById('modal-root') as HTMLElement)
  ) : (
    <></>
  )
}
