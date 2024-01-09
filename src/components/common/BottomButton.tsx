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
  smallBtnDisabled,
  fullBtnDisabled,
  bgColor = 'bg-bg',
}: BottomButtonProps) {
  const disabledClass = 'bg-gr-100 text-gr-400 border-0 hover:bg-bg-gr-100'
  const smallHoverClass = 'hover:bg-pr-200 active:bg-pr-200'
  const fullHoverClass = 'hover:bg-pr-600 active:bg-pr-600'

  return (
    <div className="fixed bottom-0 left-0 h-117 w-full">
      <div
        className={`mx-auto flex h-full min-w-320 max-w-575 justify-center gap-x-12 ${bgColor} px-20 pt-16`}
      >
        {split === 'twice' ? (
          <>
            <Button
              href={smallBtnHref}
              className={`
                h-58 min-w-51 max-w-100 flex-shrink-0 flex-grow border border-pr-500 bg-pr-100 text-pr-500
                ${smallHoverClass}
                ${smallBtnDisabled && disabledClass}
              `}
              onClick={smallBtnClick}
              disabled={smallBtnDisabled}
            >
              {smallBtnName}
            </Button>
            <Button
              href={fullBtnHref}
              className={`
                h-58 min-w-218 flex-shrink-0 flex-grow border bg-pr-500 text-white
                ${fullHoverClass}
                ${fullBtnDisabled && disabledClass}
              `}
              onClick={fullBtnClick}
              disabled={fullBtnDisabled}
            >
              {fullBtnName}
            </Button>
          </>
        ) : (
          <Button
            href={fullBtnHref}
            size="full"
            onClick={fullBtnClick}
            disabled={fullBtnDisabled}
            className={`${fullHoverClass} ${fullBtnDisabled && disabledClass}`}
          >
            {fullBtnName}
          </Button>
        )}
      </div>
    </div>
  )
}
