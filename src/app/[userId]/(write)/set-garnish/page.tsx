'use client'

import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { chosenGarnishState, rouletteResultState } from '@/store/WriteAtom'
import { checkWriteQuery } from '@/utils/checkWriteQuery'
import { toast } from '@/hooks/useToast'
import { AllGarnishesType } from '@/types/GarnishTypes'
import { garnishes } from '../../../../../data/garnishes'
import { BottomButton, TopButton, Modal } from '@/components/common'
import { Button } from '@/components/ui/button'

export default function SetGarnishPage() {
  const [chosenGarnish, setChosenGarnish] = useRecoilState(chosenGarnishState)
  const rouletteResult = useRecoilValue(rouletteResultState)
  const [isRouletteOpen, setIsRouletteOpen] = useState(false)
  const [findRouletteGarnish, setFindRouletteGarnish] = useState<AllGarnishesType>()

  const pathname = usePathname()
  const params = useSearchParams()
  const router = useRouter()

  const hostId = pathname.split('/').filter((item) => item)[0]
  const hostNickname = params.get('nickname')

  // * 공통/동적 스타일 변수
  const btnCommonClass = 'aspect-square h-full w-full rounded-6 bg-pr-100 p-20'
  const fontResponsiveClass = 'font-soyo font-black font-lg md:font-xl lg:text-30'

  const setGarnish = (clickedValue: string) => setChosenGarnish(clickedValue)
  const setRouletteOpen = () => setIsRouletteOpen((prev) => !prev)
  const toggleRouletteBtn = () =>
    !findRouletteGarnish ? setRouletteOpen() : setGarnish(findRouletteGarnish.id)

  // * 룰렛에서 선택 완료한 값 세팅
  useEffect(() => {
    if (rouletteResult) {
      const findGarnish = garnishes.find((garnish) => garnish.id === rouletteResult)
      setFindRouletteGarnish(findGarnish)
    }
  }, [rouletteResult])

  useEffect(() => {
    const [isNicknameValid, msg] = checkWriteQuery({ nickname: hostNickname, garnishCheck: false })
    if (!isNicknameValid) {
      toast({ description: msg })
      router.push(`/${hostId}?page=1`)
    }
  }, [])

  return (
    <section className="pb-40">
      <div className="content-height">
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
              <span
                className={`
                ${fontResponsiveClass}
                flex-center h-full w-full bg-gradient-to-r from-pr-500 to-[#9C38FF] bg-clip-text text-transparent
              `}
              >
                랜덤
                <br />
                룰렛
              </span>
            ) : (
              findRouletteGarnish && (
                <Image
                  src={findRouletteGarnish.src}
                  width={80}
                  height={80}
                  layout="responsive"
                  alt={`${findRouletteGarnish.alt} 고명 일러스트`}
                  className="object-contain"
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
                  <Image
                    src={garnish.src}
                    width={80}
                    height={80}
                    loading="eager"
                    layout="responsive"
                    alt={`${garnish.alt} 고명 일러스트`}
                  />
                </Button>
              ),
          )}
        </div>
      </div>

      <div className="bottom-height">
        <BottomButton
          fullBtnHref={{
            pathname: `/${hostId}/write`,
            query: { nickname: hostNickname, garnish: chosenGarnish },
          }}
          fullBtnName="덕담 남기기"
          fullBtnDisabled={!chosenGarnish}
        />
      </div>

      {isRouletteOpen && <Modal type="roulette" cancelClick={setRouletteOpen} />}
    </section>
  )
}
