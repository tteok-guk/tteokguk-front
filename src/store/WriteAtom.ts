import { atom } from 'recoil'

// * 사용자가 최종 선택한 고명값
export const chosenGarnishState = atom({
  key: 'chosenGarnishState',
  default: '',
})

// * 룰렛 결과값
export const rouletteResultState = atom({
  key: 'rouletteResultState',
  default: '',
})
