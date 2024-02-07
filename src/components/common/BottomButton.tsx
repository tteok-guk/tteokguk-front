'use client'

import Image from 'next/image'
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
  icon,
  fullBtnIcon,
  bgColor = 'bg-bg',
}: BottomButtonProps) {
  const disabledClass = 'bg-gr-100 text-gr-400 border-0 hover:bg-bg-gr-100 active:bg-gr-200'
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
        ) : split === 'openTwice' ? (
          <>
            <Button
              href={smallBtnHref}
              className={` 
            h-58 min-w-58 max-w-100 flex-shrink-0 flex-grow border border-[#FD6D6D] bg-white text-pr-500
            hover:bg-gr-100 active:bg-gr-100
            ${smallBtnDisabled && disabledClass} 
          `}
              onClick={smallBtnClick}
              disabled={smallBtnDisabled}
            >
              {icon && <Image src={icon} alt="아이콘" width={24} height={24} />}
            </Button>
            <Button
              href={fullBtnHref}
              className={`
            active:bg[#E95151] h-58 min-w-263 flex-shrink-0 flex-grow border bg-[#FD6D6D]
            text-white hover:bg-[#E95151]
            ${fullBtnDisabled && disabledClass}
          `}
              onClick={fullBtnClick}
            >
              {fullBtnIcon && (
                <Image src={fullBtnIcon} alt="아이콘" width={24} height={27} className="mr-4" />
              )}
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
            {icon && <Image src={icon} alt="아이콘" width={24} height={24} className="mr-6" />}
            {fullBtnName}
          </Button>
        )}
      </div>
    </div>
  )
}
