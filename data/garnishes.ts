import * as img from '../public/images/garnishes'
import { AllGarnishesType } from '@/types/GarnishTypes'

export const garnishes: AllGarnishesType[] = [
  {
    id: 'greenOnion',
    type: 'basic',
    src: img.greenOnion,
    alt: '파',
  },
  {
    id: 'seaweed',
    type: 'basic',
    src: img.seaweed,
    alt: '김',
  },
  {
    id: 'egg',
    type: 'basic',
    src: img.egg,
    alt: '기본 계란 지단',
  },
  {
    id: 'meat',
    type: 'basic',
    src: img.meat,
    alt: '고기',
  },
  {
    id: 'mushroom',
    type: 'basic',
    src: img.mushroom,
    alt: '버섯',
  },
  {
    id: 'dumpling',
    type: 'basic',
    src: img.dumpling,
    alt: '만두',
  },
  {
    id: 'basicRc',
    type: 'basic',
    src: img.basicRc,
    alt: '기본모양 떡',
  },
  {
    id: 'vegetable',
    type: 'basic',
    src: img.vegetable,
    alt: '볶은 야채',
  },
  {
    id: 'heartEgg',
    type: 'option',
    src: img.heartEgg,
    alt: '하트모양 계란 지단',
  },
  {
    id: 'cheese',
    type: 'option',
    src: img.cheese,
    alt: '치즈',
  },
  {
    id: 'coriander',
    type: 'option',
    src: img.coriander,
    alt: '고수',
  },
  {
    id: 'cucumber',
    type: 'option',
    src: img.cucumber,
    alt: '오이',
  },
  {
    id: 'strawberry',
    type: 'option',
    src: img.strawberry,
    alt: '딸기',
  },
  {
    id: 'pepperoncino',
    type: 'option',
    src: img.pepperoncino,
    alt: '페퍼론치노',
  },
  {
    id: 'shapedRc',
    type: 'option',
    src: img.shapedRc,
    alt: '조랭이떡',
  },
  {
    id: 'pineapple',
    type: 'option',
    src: img.pineapple,
    alt: '파인애플',
  },
  {
    id: 'coloredRc',
    type: 'option',
    src: img.coloredRc,
    alt: '오색떡',
  },
  {
    id: 'dragonRc',
    type: 'option',
    src: img.dragonRc,
    alt: '용용이',
  },
]
