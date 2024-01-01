import { StaticImageData } from 'next/image'

export interface RouletteModalProps {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void | void
}

export interface GarnishesProps {
  id: string
  type: string
  src: StaticImageData
  alt: string
}
