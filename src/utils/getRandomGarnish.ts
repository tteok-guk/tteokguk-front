import { optionGarnishes } from '../../data/optionGarnishes'

/**
 * 100 이하 랜덤하게 선택된 값에서 배열을 순회하며 각 아이템의 가중치만큼 차감
 * randomValue가 처음으로 0 이하가 선택되는 지점에서 해당 아이템 return 하므로
 * 높은 가중치를 가진 아이템이 선택될 확률이 더 높아짐
 */

export const getRandomGarnish = (): { randomGarnish: string; randomIdx: number } => {
  let randomValue = Math.random() * 100 // 100: 확률 가중치의 총합

  for (let i = 0; i < optionGarnishes.length; i++) {
    randomValue -= optionGarnishes[i].weight
    if (randomValue <= 0) {
      return { randomGarnish: optionGarnishes[i].id, randomIdx: i }
    }
  }
  // 모든 요소를 순회한 후에도 선택된 아이템이 없는 경우
  return { randomGarnish: 'none', randomIdx: -1 }
}
