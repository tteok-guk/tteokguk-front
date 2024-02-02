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
  | 'dragonRc'

type BasicGarnishName =
  | '파'
  | '김'
  | '기본 계란 지단'
  | '고기'
  | '버섯'
  | '만두'
  | '기본모양 떡'
  | '볶은 야채'

type OptionGarnishName =
  | '하트모양 계란 지단'
  | '치즈'
  | '고수'
  | '오이'
  | '딸기'
  | '페퍼론치노'
  | '조랭이떡'
  | '파인애플'
  | '오색떡'
  | '용용이'

export type AllGarnishesType = {
  id: BasicGarnishId | OptionGarnishId
  type: 'basic' | 'option'
  src: StaticImageData
  alt: BasicGarnishName | OptionGarnishName
}

export type OptionGarnishesType = {
  id: OptionGarnishId
  weight: number
}
