'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { ModalProps, ModalComponentType } from '@/types/CommonTypes'
import { ConfirmModal, RouletteModal, ToastModal } from '../modal'

export default function Modal({ type, cancelClick, confirmClick }: ModalProps) {
  const [mounted, setMounted] = useState(false)

  const componentType: ModalComponentType = {
    confirm: <ConfirmModal cancelClick={cancelClick} confirmClick={confirmClick} />,
    roulette: <RouletteModal cancelClick={cancelClick} />,
    toast: <ToastModal />,
  }
  const componentToRender = componentType[type]

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  const modalRoot = document.getElementById('modal-root') as HTMLElement
  return createPortal(componentToRender, modalRoot)
}
