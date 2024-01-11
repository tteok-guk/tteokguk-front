import { garnishes } from '../../data/garnishes'
import { WriteQueryProps } from '@/types/WriteTypes'

// * 고명 선택/작성 페이지 쿼리스트링 데이터 검증
export const checkWriteQuery = ({ nickname, garnish }: WriteQueryProps): [boolean, string] => {
  if (!nickname) {
    return [false, '유효하지 않은 닉네임입니다.']
  }
  if (garnish && !garnishes.find((item) => item.id === garnish)) {
    return [false, '유효하지 않은 고명입니다.']
  }
  return [true, '']
}
