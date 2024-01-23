'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { ModalProps, ModalComponentType } from '@/types/CommonTypes'
import { RouletteModal, LogoutModal } from '../modal'

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
  }
  const componentToRender = componentType[type]

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(componentToRender, document.getElementById('modal-root') as HTMLElement)
    : null
}
