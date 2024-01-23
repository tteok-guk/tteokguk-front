import { StaticImageData } from 'next/image'

export interface AvatarType {
  name: string
  smallSrc: StaticImageData
  nomalSrc: StaticImageData
  alt: string
}
