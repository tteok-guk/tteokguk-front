import { StaticImageData } from 'next/image'

export type changeMattType = {
  id: string
  src: StaticImageData
  alt: string
}

export type MattParamsType = {
  mattType: string
}
