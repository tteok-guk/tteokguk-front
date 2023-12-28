'use client'

import { Button } from '../ui/button'
import { BottomButtonProps } from '@/types/CommonTypes'

export default function BottomButton({
  split = 'none',
  smallBtnName,
  fullBtnName,
  smallBtnClick,
  fullBtnClick,
}: BottomButtonProps) {
  return (
    <div className="absolute z-10 left-0 px-20 pt-16 bottom-0 w-full h-117 flex gap-x-12 bg-white">
      {split === 'twice' ? (
        <>
          <Button className="border border-pr-500 text-pr-500 min-w-51 max-w-100 min-h-51 flex-grow flex-shrink-0" onClick={smallBtnClick}>
            {smallBtnName}
          </Button>
          <Button className="border min-w-218 min-h-51 flex-grow flex-shrink-0 bg-pr-500 text-white" onClick={fullBtnClick}>
            {fullBtnName}
          </Button>
        </>
      ) : (
        <Button size="full" className="border" onClick={fullBtnClick}>
          {fullBtnName}
        </Button>
      )}
    </div>
  )
}
