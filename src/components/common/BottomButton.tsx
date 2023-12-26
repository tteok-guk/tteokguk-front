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
    <div className="absolute bottom-0 left-0 h-28 w-full px-5 pt-4">
      {split === 'none' ? (
        <Button size="full" className="border" onClick={fullBtnClick}>
          {fullBtnName}
        </Button>
      ) : (
        <div className="flex gap-3">
          <Button size="sm" className="border" onClick={smallBtnClick}>
            {smallBtnName}
          </Button>
          <Button size="full" className="border" onClick={fullBtnClick}>
            {fullBtnName}
          </Button>
        </div>
      )}
    </div>
  )
}
