'use client'

import { useState, useRef, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { rouletteResultState } from '@/store/WriteAtom'
import { optionGarnishes } from '../../data/optionGarnishes'
import { garnishes } from '../../data/garnishes'
import { getRandomGarnish } from '@/utils/getRandomGarnish'
import Image from 'next/image'
import { toast } from '@/hooks/useToast'
import { Button } from './ui/button'
import { iconLocation } from '../../public/images/icons'
import { rouletteBoard } from '../../public/images/etc'

export default function Roulette() {
  const [rouletteResult, setRouletteResult] = useRecoilState(rouletteResultState) // 룰렛 결과값
  const [btnName, setBtnName] = useState('룰렛\n돌리기!')
  const [disabled, setDisabled] = useState(false)

  const imageRef = useRef<HTMLImageElement>(null)

  // * 룰렛 회전 함수
  const rotate = () => {
    const image = imageRef.current
    if (!image) return

    setDisabled(true) // 버튼 1회만 클릭 가능하도록 state 설정

    image.style.transition = 'initial'
    image.style.transform = 'initial'

    const TOTAL_ROTATION_TIME = 3000 // 룰렛 회전에 소요되는 시간
    const totalDegrees = 3600 // 총 회전할 각도
    const { randomGarnish, randomIdx } = getRandomGarnish()

    if (randomGarnish === 'none') {
      toast({
        description:
          '랜덤 고명 선택 중 오류가 발생했습니다. 팝업 종료 후 룰렛을 다시 클릭해주세요.',
      })
    }

    // OptionGarnishes 배열의 weight을 기반으로 부채꼴(arcurate) 각도 계산
    const arc = optionGarnishes.map((item) => (item.weight / 100) * 360)

    // 랜덤 선택된 고명까지 회전시킬 각도 계산
    let rotationAngle = 0
    for (let i = 0; i <= randomIdx; i++) {
      rotationAngle += arc[i] // 0번째 인덱스부터 randomIdx까지 해당 각도값 누적
    }
    rotationAngle += 83 // 룰렛 보정 각도

    image.style.transition = `transform ${TOTAL_ROTATION_TIME}ms ease-out`
    image.style.transform = `rotate(-${totalDegrees + rotationAngle}deg)`

    // 회전 후 랜덤 선택된 고명 설정
    setTimeout(() => {
      setRouletteResult(randomGarnish)
    }, TOTAL_ROTATION_TIME)
  }

  useEffect(() => {
    if (rouletteResult) {
      const resultInfo = garnishes.find((item) => item.id === rouletteResult && item.alt)
      resultInfo && setBtnName(resultInfo.alt)
    }
  }, [rouletteResult])

  return (
    <div className="relative">
      <Image
        src={iconLocation}
        alt="선택된 고명을 가리키는 아이콘"
        width="28"
        height="31"
        className="absolute left-1/2 top-0 z-10 -translate-x-1/2"
      />
      <Image
        ref={imageRef}
        src={rouletteBoard}
        height={270}
        width={270}
        loading="eager"
        className="mt-19"
        alt="룰렛 원판 이미지"
        priority
      />
      <Button
        onClick={rotate}
        disabled={disabled}
        className={`
          absolute left-90 top-107 z-10 h-90 w-90 whitespace-pre-line break-keep
          rounded-full bg-pr-500 font-soyoThin font-bold text-white
          ${disabled && 'hover:bg-pr-500 active:bg-pr-500'}
        `}
      >
        {btnName}
      </Button>
    </div>
  )
}
