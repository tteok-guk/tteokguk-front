import { StaticImageData } from 'next/image'

export interface RouletteModalProps {
  cancelClick: (() => void) | undefined
}

export interface WriteGarnishProps {
  [key: string]: string
}

export interface WriteQueryProps {
  nickname?: string | null
  garnishCheck: boolean
  garnish?: string | null
}
