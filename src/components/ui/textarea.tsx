import * as React from 'react'

import { isMobileDevice } from '@/utils/isMobileDevice'
import { cn } from '@/libs/shadcnUtils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const isMobile = isMobileDevice()
    const textareaHeight = isMobile ? 'h-312' : 'h-512'

    return (
      <textarea
        className={cn(`
          font-sm blue-scroll placeholder:font-sm my-16 flex w-full resize-none rounded-4 border-2 border-pr-200 bg-white
          px-20 py-16 font-soyoThin placeholder:text-gr-300
          focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50
          ${textareaHeight}
          ${className},
        `)}
        maxLength={700}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
