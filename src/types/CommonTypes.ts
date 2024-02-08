import { StaticImageData } from 'next/image'

export interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export interface TopButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | void
}

export interface BottomButtonProps {
  split?: 'none' | 'twice' | 'openTwice'
  smallBtnName?: string
  fullBtnName: string
  smallBtnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  fullBtnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  smallBtnHref?: string | object
  fullBtnHref?: string | object
  smallBtnDisabled?: boolean
  fullBtnDisabled?: boolean
  icon?: StaticImageData
  fullBtnIcon?: StaticImageData
  bgColor?: string
}

type ModalType = 'roulette' | 'logout' | 'userTest' | 'cs' | 'loading'

export interface ModalProps {
  type: ModalType
  cancelClick?: () => void
  title?: string
  cancelBtnTitle?: string
  confirmTitle?: string
  cancelBtnFn?: () => void
  confirmBtnFn?: () => void
}

export type ModalComponentType = {
  [key in ModalType]: React.ReactNode
}
