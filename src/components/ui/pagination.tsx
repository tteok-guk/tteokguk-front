import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/libs/shadcnUtils'
import { shadcnButtonProps, buttonVariants } from '@/components/ui/shadcnButton'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex-center w-full h-18', className)}
    {...props}
  />
)

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-4', className)} {...props} />
  ),
)
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('text-14', className)} {...props} />,
)
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<shadcnButtonProps, 'size'> &
  React.ComponentProps<'a'>

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <PaginationItem>
    <a
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    />
  </PaginationItem>
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="이전 페이지로 이동"
    size="default"
    className={cn('pr-10 w-18 h-18 p-0', className)}
    {...props}
  >
    <ChevronLeft className="h-fit w-fit" />
    <span className="sr-only">이전 페이지</span>
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="다음 페이지로 이동"
    size="default"
    className={cn('pr-10 w-18 h-18 p-0', className)}
    {...props}
  >
    <span className="sr-only">다음 페이지</span>
    <ChevronRight className="h-fit w-fit" />
  </PaginationLink>
)

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
