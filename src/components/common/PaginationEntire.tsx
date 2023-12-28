'use client'
import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const PaginationEntire = () => {
  const nextButton = () => {
    alert('오른쪽화살표 눌림')
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <div className="flex-center">
          <PaginationItem>
            <PaginationLink href="#" className="text-14" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <span className="mx-4">/</span>
          <PaginationItem>
            <PaginationLink href="#" className="text-14">
              1
            </PaginationLink>
          </PaginationItem>
          <span className="text-14 ml-4">그릇</span>
        </div>
        <PaginationItem>
          <PaginationNext href="#" onClick={nextButton} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationEntire
