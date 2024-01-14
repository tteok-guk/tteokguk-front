'use client'

import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { chosenGarnishState, rouletteResultState } from '@/store/WriteAtom'
import { checkWriteQuery } from '@/utils/checkWriteQuery'
import { useToast } from '@/hooks/use-toast'
import { AllGarnishesType } from '@/types/GarnishTypes'
import { garnishes } from '../../../../../data/garnishes'
import { BottomButton, TopButton, Modal } from '@/components/common'
import { Button } from '@/components/ui/button'

export default function SetGarnishPage() {
  const [isRouletteOpen, setIsRouletteOpen] = useState(false)
  const [chosenGarnish, setChosenGarnish] = useRecoilState(chosenGarnishState)
  const [rouletteResult, setRouletteResult] = useRecoilState(rouletteResultState)
  const [findRouletteGarnish, setFindRouletteGarnish] = useState<AllGarnishesType>()

  const pathname = usePathname()
  const params = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const hostId = pathname.split('/').filter((item) => item)[0]
  const hostNickname = params.get('nickname')

  // * 공통/동적 스타일 변수
  const btnCommonClass = 'aspect-square h-full w-full rounded-6 bg-pr-100 p-20'

  const setGarnish = (clickedValue: string) => setChosenGarnish(clickedValue)
  const setRouletteOpen = () => setIsRouletteOpen((prev) => !prev)
  const toggleRouletteBtn = () =>
    !findRouletteGarnish ? setRouletteOpen() : setGarnish(findRouletteGarnish.id)

  // * 룰렛에서 선택한 값 세팅
  useEffect(() => {
    if (rouletteResult) {
      const findGarnish = garnishes.find((garnish) => garnish.id === rouletteResult)
      setFindRouletteGarnish(findGarnish)
    }
  }, [rouletteResult])

  useEffect(() => {
    const [isNicknameValid, msg] = checkWriteQuery({ nickname: hostNickname })
    if (!isNicknameValid) {
      toast({ description: msg })
      router.push(`/${hostId}?page=1`)
    }
  }, [])

  return (
    <section className="pb-40">
      <TopButton />
      <h1 className="font-xl pt-12">
        편지를 남길
        <br />
        고명을 선택해 주세요
      </h1>
      <div className="flex-center mt-40 grid grid-cols-3 gap-12">
        <Button
          className={`
            ${btnCommonClass}
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
              />
            )
          )}
        </Button>

        {garnishes.map(
          (garnish, idx) =>
            garnish.type === 'basic' && (
              <Button
                key={idx}
                className={`
                  ${btnCommonClass}
                  ${chosenGarnish === garnish.id ? 'border-3 border-pr-500' : ''}
                `}
                onClick={() => setGarnish(garnish.id)}
              >
                <Image src={garnish.src} alt={`${garnish.alt} 고명 일러스트`} />
              </Button>
            ),
        )}
      </div>

      <BottomButton
        fullBtnHref={{
          pathname: `/${hostId}/write`,
          query: { nickname: hostNickname, garnish: chosenGarnish },
        }}
        fullBtnName="덕담 남기기"
      />

      {isRouletteOpen && <Modal type="roulette" cancelClick={setRouletteOpen} />}
    </section>
  )
}
