'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { ModalProps, ModalType } from '@/types/CommonTypes'
import { SideBarModal, RouletteModal } from '../modal'

//

export default function Modal({ type, cancelClick, confirmClick }: ModalProps) {
  const [mounted, setMounted] = useState(false)

  const componentType: ModalType = {
    sideBar: <SideBarModal cancelClick={cancelClick} confirmClick={confirmClick} />,
    roulette: <RouletteModal cancelClick={cancelClick} />,
  }
  const componentToRender = componentType[type]
  const modalRoot = document.getElementById('modal-root') as HTMLElement

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return mounted ? createPortal(componentToRender, modalRoot) : <></>
}
