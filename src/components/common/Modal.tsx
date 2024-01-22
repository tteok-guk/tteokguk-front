'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { ModalProps, ModalComponentType } from '@/types/CommonTypes'
import { RouletteModal } from '../modal'

export default function Modal({ type, cancelClick, confirmClick }: ModalProps) {
  const [mounted, setMounted] = useState(false)

  const componentType: ModalComponentType = {
    roulette: <RouletteModal cancelClick={cancelClick} />,
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
