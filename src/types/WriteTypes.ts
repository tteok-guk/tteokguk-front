import { StaticImageData } from 'next/image'

export interface RouletteModalProps {
  cancelClick: (() => void) | undefined
}

export interface WriteGarnishProps {
  [key: string]: string
}

export interface WriteQueryProps {
  nickname?: string | null
  garnish?: string | null
}
