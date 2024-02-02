'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  heartEgg,
  cucumber,
  dumpling,
  strawberry,
  shapedRc,
} from '../../../public/images/garnishes'

export default function Loading() {
  const [currentImg, setCurrentImg] = useState(0)
  const loadingImg = [heartEgg, cucumber, dumpling, strawberry, shapedRc]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % loadingImg.length)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="flex-center h-full">
      <div className="flex-center aspect-square h-100 w-100 rounded-full bg-gr-100 p-25">
        <Image src={loadingImg[currentImg]} alt="로딩 아이콘" />
      </div>
    </section>
  )
}
