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
  bgColor?: string
}
