'use client'

import { paginationState } from '@/store/paginationAtom'
import { paginationType } from '@/types/MainPageTypes'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

const PaginationEntire = ({ pageSize, pageParam, currentNum }: paginationType) => {
  const [current, setCurrent] = useRecoilState(paginationState)

  const params = useSearchParams()
  const router = useRouter()

  const currentPage: number = Number(params.get('page')) || 1

  const movePage = (flag: string) => {
    if ((flag === 'prev' && currentPage <= 1) || (flag === 'next' && currentPage >= pageSize)) {
      return
    }
    const movePageNum = flag === 'prev' ? currentPage - 1 : currentPage + 1
    setCurrent(movePageNum)
  }

  useEffect(() => {
    router.push(`/${pageParam}?page=${current}`)
  }, [current])

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
