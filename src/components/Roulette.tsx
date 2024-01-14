'use client'

import { useState, useRef, useEffect } from 'react'
import { OptionGarnishes } from '../../data/garnishRoulette'
import NextImage from 'next/image' // HTML Image와 이름 중복되어 별칭으로 import
import { Button } from './ui/button'
import { iconLocation } from '../../public/images/icons'

export default function Roulette() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null) // 선택된 음식 저장

  // * 룰렛 회전 함수
  const rotate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const TOTAL_ROTATION_TIME = 3000 // 룰렛 회전에 소요되는 시간
    const totalDegrees = 3600 // 총 회전할 각도
    const randomIdx = Math.floor(Math.random() * OptionGarnishes.length) // 랜덤 선택된 아이템의 인덱스

    // OptionGarnishes 배열의 proportion을 기반으로 부채꼴(arcurate) 각도 계산
    const arc = OptionGarnishes.map((item) => (item.proportion / 100) * 360)

    // 랜덤 선택된 고명까지 회전시킬 각도 계산
    let rotationAngle = 0
    for (let i = 0; i <= randomIdx; i++) {
      rotationAngle += arc[i] // 0번째 인덱스부터 randomIdx까지 해당 각도값 누적
    }
    rotationAngle += 81 // 룰렛 보정 각도

    canvas.style.transition = `transform ${TOTAL_ROTATION_TIME}ms ease-out`
    canvas.style.transform = `rotate(-${totalDegrees + rotationAngle}deg)`

    // 회전 후 랜덤 선택된 고명 설정
    setTimeout(() => {
      setSelectedItem(OptionGarnishes[randomIdx]['id'])
    }, TOTAL_ROTATION_TIME)
  }

  // * 이미지 로드 함수
  const loadImg = (src: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  // * 컴포넌트가 마운트된 후 캔버스에 룰렛 생성
  useEffect(() => {
    // 이미지가 모두 onload 되었을 때 함수 실행
    Promise.all(OptionGarnishes.map((item) => loadImg(item.src))).then((images) => {
      const canvas = canvasRef.current // 캔버스 엘리먼트
      if (!canvas) return

      // 2D 그래픽을 그리기 위한 컨텍스트 객체(ctx)를 가져옴
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // 캔버스의 높이와 절반 값을 계산하여 중앙점의 x좌표(cw)와 y좌표(ch)를 구함
      const [cw, ch] = [canvas.width / 2, canvas.height / 2]

      const radius = cw - 20 // 캔버스 중앙에서부터의 반지름 정의
      let totalAngle = 0 // 총 각도 계산을 위한 초기값 설정

      // OptionGarnishes의 각 아이템을 순회하며 룰렛의 섹터를 그림
      OptionGarnishes.forEach((item, idx) => {
        const angle = (item.proportion / 100) * (Math.PI * 2)

        // 1) 섹터 그리기
        // 시작 각도: totalAngle, 끝 각도: totalAngle + angle
        ctx.beginPath()
        ctx.fillStyle = item.color
        ctx.moveTo(cw, ch)
        ctx.arc(cw, ch, radius, totalAngle, totalAngle + angle)
        ctx.fill()

        // 2) 원형 테두리 그리기
        ctx.beginPath()
        ctx.arc(cw, ch, radius, 0, Math.PI * 2)
        ctx.strokeStyle = '#007791'
        ctx.lineWidth = 0.1
        ctx.stroke()

        // 3) 이미지 그리기
        // 반지름의 3/4을 사용하여 이미지를 중앙(1/2)보다 더 바깥쪽으로 이동
        const elementX = cw + ((radius * 3) / 4) * Math.cos(totalAngle + angle / 2)
        const elementY = ch + ((radius * 3) / 4) * Math.sin(totalAngle + angle / 2)
        const scaledWidth = 33
        const scaledHeight = 33

        // 각 이미지의 배경 그리기
        // const backgroundRadius = scaledWidth / 2 + 10
        // ctx.beginPath()
        // ctx.fillStyle = item.color
        // ctx.arc(elementX, elementY, backgroundRadius, 0, Math.PI * 2)
        // ctx.fill()

        // 이미지가 섹터의 중앙에 오도록 위치 조정
        const adjustedImgX = elementX - scaledWidth / 2
        const adjustedImgY = elementY - scaledHeight / 2

        const img = images[idx]
        ctx.drawImage(img, adjustedImgX, adjustedImgY, scaledWidth, scaledHeight)

        // 4) 다음 섹터를 위한 시작 각도 업데이트
        totalAngle += angle
      })
    })
  }, [])

  return (
    <div className="relative">
      <NextImage
        src={iconLocation}
        alt="선택된 고명을 가리키는 아이콘"
        width="25"
        height="28"
        className="absolute left-140 top-5 z-10"
      />
      <canvas ref={canvasRef} width="300" height="300"></canvas>
      <Button
        onClick={rotate}
        className="absolute left-107 top-107 h-90 w-90 rounded-full bg-pr-500 font-soyoThin font-bold text-white"
      >
        룰렛
        <br />
        돌리기!
      </Button>
      {selectedItem && <div>{selectedItem}</div>}
    </div>
  )
}
