import { StaticImageData } from 'next/image'

type BasicGarnishId =
  | 'greenOnion'
  | 'seaweed'
  | 'egg'
  | 'meat'
  | 'mushroom'
  | 'dumpling'
  | 'basicRc'
  | 'vegetable'

type OptionGarnishId =
  | 'heartEgg'
  | 'cheese'
  | 'coriander'
  | 'cucumber'
  | 'strawberry'
  | 'pepperoncino'
  | 'shapedRc'
  | 'pineapple'
  | 'coloredRc'

export type AllGarnishesType = {
  id: BasicGarnishId | OptionGarnishId
  type: 'basic' | 'option'
  src: StaticImageData
  alt: string
}

export type OptionGarnishesType = {
  id: OptionGarnishId
  name: string
  src: `/images/garnishes/${OptionGarnishId}.png`
  proportion: number
  color: string
}
