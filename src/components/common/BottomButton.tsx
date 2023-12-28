'use client'

import { Button } from '../ui/button'
import { BottomButtonProps } from '@/types/CommonTypes'

export default function BottomButton({
  split = 'none',
  smallBtnName,
  fullBtnName,
  smallBtnClick,
  fullBtnClick,
  smallBtnHref,
  fullBtnHref,
}: BottomButtonProps) {
  return (
    <div className="absolute bottom-0 left-0 z-10 flex h-117 w-full gap-x-12 px-20 pt-16">
      {split === 'twice' ? (
        <>
          <Button
            href={smallBtnHref}
            className="min-h-51 min-w-51 max-w-100 flex-shrink-0 flex-grow border border-pr-500 text-pr-500"
            onClick={smallBtnClick}
          >
            {smallBtnName}
          </Button>
          <Button
            href={fullBtnHref}
            className="min-h-51 min-w-218 flex-shrink-0 flex-grow border bg-pr-500 text-white"
            onClick={fullBtnClick}
          >
            {fullBtnName}
          </Button>
        </>
      ) : (
        <Button href={fullBtnHref} size="full" className="border" onClick={fullBtnClick}>
          {fullBtnName}
        </Button>
      )}
    </div>
  )
}
