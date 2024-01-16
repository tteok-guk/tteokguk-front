'use client'

import { paginationType } from '@/types/MainPageTypes'
import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

const PaginationEntire = ({ pageSize, pageParam, currentNum }: paginationType) => {
  const params = useSearchParams()
  const router = useRouter()

  const [page, setPage] = useState<number>(Number(params.get('page')) || 1)

  const currentPage: number = Number(params.get('page'))

  const pagesize = pageSize ? pageSize : 1
  const movePage = (flag?: string) => {
    if ((flag === 'prev' && currentPage <= 1) || (flag === 'next' && currentPage >= pagesize)) {
      return
    }
    const movePageNum = flag === 'prev' ? currentPage - 1 : currentPage + 1
    setPage(movePageNum)
  }

  useEffect(() => {
    if (!Number.isInteger(currentPage) || currentPage < 1 || currentPage > pagesize) {
      // todo ?page=100과 같이 유효하지 않은 번호 입력하면 일단 undefined 떡국 떴다가 1페이지로 넘어감
      toast({ description: '유효한 페이지 번호가 아닙니다.' })
      setPage(1)
      return
    }
    setPage(currentPage)
  }, [])

  useEffect(() => {
    router.push(`/${pageParam}?page=${page}`)
  }, [page])

  return (
    <nav className="w-full">
      <ul className="flex-center gap-5 text-14">
        <li>
          <Button onClick={() => movePage('prev')}>&lt;</Button>
        </li>
        <li>{currentNum}</li>
        <li>/</li>
        <li>{pageSize} 그릇</li>
        <li>
          <Button onClick={() => movePage('next')}>&gt;</Button>
        </li>
      </ul>
    </nav>
  )
}

export default PaginationEntire
