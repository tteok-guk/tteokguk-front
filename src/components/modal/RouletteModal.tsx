'use client'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { chosenGarnishState, rouletteResultState } from '@/store/WriteAtom'
import Image from 'next/image'
import { RouletteModalProps } from '@/types/WriteTypes'
import { Button } from '../ui/button'
import { iconClose } from '../../../public/images/icons'
import Roulette from '../Roulette'

export default function RouletteModal({ cancelClick }: RouletteModalProps) {
  const setChosenGarnish = useSetRecoilState(chosenGarnishState) // 사용자가 최종 선택한 고명값
  const rouletteResult = useRecoilValue(rouletteResultState) // 룰렛 결과값

  const doneRoulette = () => {
    setChosenGarnish(rouletteResult)
    cancelClick && cancelClick()
  }

  return (
    <div className="modal-bg">
      <div className="modal-wrap">
        <section className="flex h-500 w-335 flex-col items-end justify-between rounded-5 bg-white p-20">
          <Button onClick={cancelClick} className="float-right m-5">
            <Image src={iconClose} alt="모달 종료를 위한 엑스 모양 아이콘" width={18} height={18} />
          </Button>
          <div className="clear-right flex h-full w-full flex-col items-center gap-8 pt-10">
            <h2 className="font-soyo text-22 font-semibold">랜덤 고명 뽑기!</h2>
            <p className="text-12 font-medium leading-14">뽑기는 한 번만 할 수 있어요.</p>
            <Roulette />
          </div>
          <Button size="full" onClick={doneRoulette} disabled={!rouletteResult}>
            완료
          </Button>
        </section>
      </div>
    </div>
  )
}
