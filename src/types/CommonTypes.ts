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

export interface ModalProps {
  type: 'roulette' | 'confirm'
  cancelClick?: () => void
  confirmClick?: () => void
}

export type ModalType = {
  [key in 'roulette' | 'confirm']: React.ReactNode
}

export interface ConfirmModalProps {
  cancelClick: (() => void) | undefined
  confirmClick: (() => void) | undefined
}
