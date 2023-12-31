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
  bgColor = 'bg-bg',
}: BottomButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 h-117 w-full">
      <div
        className={`mx-auto flex h-full min-w-320 max-w-575 justify-center gap-x-12 ${bgColor} px-20 pt-16`}
      >
        {split === 'twice' ? (
          <>
            <Button
              href={smallBtnHref}
              className="h-58 min-w-51 max-w-100 flex-shrink-0 flex-grow border border-pr-500 text-pr-500"
              onClick={smallBtnClick}
            >
              {smallBtnName}
            </Button>
            <Button
              href={fullBtnHref}
              className="h-58 min-w-218 flex-shrink-0 flex-grow border bg-pr-500 text-white"
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
    </div>
  )
}
