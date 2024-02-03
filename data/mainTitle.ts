import * as img from '../public/images/onboarding'
import { sampleDish } from '../public/images/dishes'
import { onboardingType } from '@/types/OnboardingTypes'

export const OnboardingData: onboardingType[] = [
  {
    step: 1,
    src: sampleDish,
    alt: '니떡내떡 용 캐릭터 및 떡국 일러스트',
    title: '니떡국 내떡국',
    desc: '고명에 마음을 담았어요!',
  },
  {
    step: 2,
    src: img.step2,
    alt: '내 떡국 페이지 스크린샷',
    title: '덕담을 주고 받아요!',
    desc: '떡국을 공유하고',
  },
  {
    step: 3,
    src: img.step3,
    alt: '랜덤 고명 뽑기 룰렛 스크린샷',
    title: '랜덤 고명 뽑기!',
    desc: '고명을 고르기 어렵다면',
  },
  {
    step: 4,
    src: img.step4,
    alt: '내 떡국 페이지 스크린샷',
    title: '사진을 찍어요!',
    desc: '덕담을 남기고, 나의 캐릭터로',
  },
]
