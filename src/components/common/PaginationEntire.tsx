'use client'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { paginationState } from '@/store/paginationAtom'
import { paginationType } from '@/types/MainPageTypes'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

const PaginationEntire = ({ pageSize, pageParam }: paginationType) => {
  const [current, setCurrent] = useRecoilState(paginationState)
  const [isDisable, setDisable] = useState(false)
  console.log(current)
  const nextButton = () => {
    if (current < pageSize) {
      setCurrent(current + 1)
    }
  }

  const prevButton = () => {
    if (current > 1) {
      // setCurrent({ page: current.page - 1 })
      setCurrent(current - 1)
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`/${pageParam}?page=${current}`} onClick={prevButton} />
        </PaginationItem>
        <div className="flex-center">
          <PaginationItem>
            <PaginationLink href="#" className="text-14" isActive>
              {current}
            </PaginationLink>
          </PaginationItem>
          <span className="mx-4">/</span>
          <PaginationItem>
            <PaginationLink href="#" className="text-14">
              {pageSize}
            </PaginationLink>
          </PaginationItem>
          <span className="ml-4 text-14">그릇</span>
        </div>
        <PaginationItem>
          <PaginationNext href={`/${pageParam}?page=${current}`} onClick={nextButton} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationEntire
