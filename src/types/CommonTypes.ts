import { StaticImageData } from 'next/image'

export interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export interface TopButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | void
}

export interface BottomButtonProps {
  split?: 'none' | 'twice'
  smallBtnName?: string
  fullBtnName: string
  smallBtnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  fullBtnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  smallBtnHref?: string | object
  fullBtnHref?: string | object
  smallBtnDisabled?: boolean
  fullBtnDisabled?: boolean
  icon?: StaticImageData
  bgColor?: string
}

type ModalType = 'roulette' | 'confirm' | 'toast'

export interface ModalProps {
  type: ModalType
  cancelClick?: () => void
  confirmClick?: () => void
}

export type ModalComponentType = {
  [key in ModalType]: React.ReactNode
}

export interface ConfirmModalProps {
  cancelClick: (() => void) | undefined
  confirmClick: (() => void) | undefined
}
