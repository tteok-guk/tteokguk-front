import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/libs/shadcnUtils'
import Link from 'next/link'

const buttonVariants = cva('font-base disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    size: {
      default: 'h-fit w-fit',
      full: 'w-full h-58 bg-pr-500 text-white',
    },
    shape: {
      default: 'rounded-6',
      circle: 'rounded-full',
    },
  },
  defaultVariants: {
    size: 'default',
    shape: 'default',
  },
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  href?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size, shape, href, children, className, onClick, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ size, shape, className }))}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {href ? <Link href={href}>{children}</Link> : children}
      </button>
    )
  },
)
Button.displayName = 'Button'
