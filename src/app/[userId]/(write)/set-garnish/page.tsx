'use client'

import { BottomButton, TopButton } from '@/components/common'
import { Button } from '@/components/ui/button'
import { RouletteModal } from '@/components/modal/RouletteModal'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { chosenGarnishState, rouletteResultState } from '@/store/WriteAtom'
import { GarnishesProps } from '@/types/WriteTypes'
import Image from 'next/image'
import { garnishes } from '../../../../../data/garnishes'

export default function SetGarnishPage() {
  const [isRouletteOpen, setIsRouletteOpen] = useState(false)
  const [chosenGarnish, setChosenGarnish] = useRecoilState(chosenGarnishState)
  const [rouletteResult, setRouletteResult] = useRecoilState(rouletteResultState)
  const [findRouletteGarnish, setFindRouletteGarnish] = useState<GarnishesProps>()

  const setGarnish = (clickedValue: string) => setChosenGarnish(clickedValue)
  const setRouletteOpen = () => setIsRouletteOpen((prev) => !prev)
  const toggleRouletteBtn = () =>
    !findRouletteGarnish ? setRouletteOpen() : setGarnish(findRouletteGarnish.id)

  useEffect(() => {
    if (rouletteResult) {
      const findGarnish = garnishes.find((garnish) => garnish.id === rouletteResult)
      setFindRouletteGarnish(findGarnish)
    }
  }, [rouletteResult])

  return (
    <section>
      <TopButton />
      <h1 className="font-xl pt-12">고명을 선택해 주세요</h1>
      <div className="flex-center mt-40 grid grid-cols-3 gap-12">
        <Button
          className={`
            aspect-square h-full w-full rounded-6 bg-pr-100
            ${chosenGarnish === findRouletteGarnish?.id ? 'border-3 border-pr-500' : ''}
          `}
          onClick={toggleRouletteBtn}
        >
          {!rouletteResult ? (
            <span className="font-lg lg:font-xl bg-gradient-to-r from-pr-500 to-[#9C38FF] bg-clip-text font-soyo font-black text-transparent">
              랜덤
              <br />
              룰렛
            </span>
          ) : (
            findRouletteGarnish && (
              <Image
                src={findRouletteGarnish.src}
                alt={`${findRouletteGarnish.alt} 고명 일러스트`}
                width={78}
                height={78}
              />
            )
          )}
          {/* todo 실제 모바일에서 폰트 굵기 일정하게 나오는지 확인해보기 (pc는 27px정도 되어야 하는 것 같음) */}
        </Button>
        {garnishes.map(
          (garnish, idx) =>
            garnish.type === 'basic' && (
              <Button
                key={idx}
                className={`
                  aspect-square h-full w-full rounded-6 bg-pr-100
                  ${chosenGarnish === garnish.id ? 'border-3 border-pr-500' : ''}
                `}
                onClick={() => setGarnish(garnish.id)}
              >
                <Image
                  src={garnish.src}
                  alt={`${garnish.alt} 고명 일러스트`}
                  width={78}
                  height={78}
                />
              </Button>
            ),
        )}
      </div>
      <BottomButton
        fullBtnHref={{
          pathname: '/hansol/write',
          query: { garnish: chosenGarnish },
        }}
        fullBtnName="덕담 남기기"
      />

      {isRouletteOpen && <RouletteModal onClose={setRouletteOpen} />}
    </section>
  )
}
