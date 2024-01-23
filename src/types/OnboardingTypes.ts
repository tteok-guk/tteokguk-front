import { StaticImageData } from 'next/image'

export type onboardingType = {
  step: number
  src: StaticImageData | string
  alt: string
  title: string
  desc: string
}
