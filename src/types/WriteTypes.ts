import { StaticImageData } from 'next/image'

export interface RouletteModalProps {
  onClose: () => void
}

export interface GarnishesProps {
  id: string
  type: string
  src: StaticImageData
  alt: string
}

export interface WriteGarnishProps {
  [key: string]: string
}

export interface WriteQueryProps {
  nickname?: string | null
  garnish?: string | null
}
