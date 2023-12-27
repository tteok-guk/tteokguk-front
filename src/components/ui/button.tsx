import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/libs/shadcnUtils'
import Link from 'next/link'

const buttonVariants = cva('text-base disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    size: {
      default: 'h-fit w-fit',
      sm: 'w-58 h-58',
      lg: 'w-265 h-58',
      full: 'w-335 h-58',
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
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size, shape, href, children, className, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ size, shape, className }))} ref={ref} {...props}>
        {href ? <Link href={href}>{children}</Link> : children}
      </button>
    )
  },
)
Button.displayName = 'Button'
