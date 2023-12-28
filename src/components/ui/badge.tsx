import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/libs/shadcnUtils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border py-3 px-15 text-14 font-semibold transition-colors cursor-default focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 justify-center',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-gray-300 text-black',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
