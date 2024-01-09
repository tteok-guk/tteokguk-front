import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/libs/shadcnUtils'
import Link from 'next/link'

const buttonVariants = cva('flex-center font-base', {
  variants: {
    size: {
      default: 'h-fit w-fit',
      full: 'w-full h-58 bg-pr-500 text-white hover:bg-pr-600 active:bg-pr-600',
    },
    shape: {
      default: 'rounded-6',
      circle: 'rounded-full',
    },
    disabled: {
      true: 'bg-gr-100 text-gr-400 hover:bg-gr-100',
      false: '',
    },
  },
  defaultVariants: {
    size: 'default',
    shape: 'default',
    disabled: false,
  },
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  href?: string | object
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size, shape, href, disabled, children, className, onClick, ...props }, ref) => {
    return (
      <Link href={href ?? ''} className={cn(buttonVariants({ size, shape, disabled, className }))}>
        <button
          ref={ref}
          onClick={onClick}
          disabled={disabled}
          className="flex-center h-full w-full"
          {...props}
        >
          {children}
        </button>
      </Link>
    )
  },
)
Button.displayName = 'Button'
