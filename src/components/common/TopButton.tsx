'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TopButtonProps } from '@/types/CommonTypes'
import { Button } from '@/components/ui/button'
import { arrow } from '../../../public/images'

export default function TopButton({ onClick }: TopButtonProps) {
  const router = useRouter()
  const setOnClick = onClick ? onClick : () => router.back()

  return (
    <div className="w-full">
      <Button className="mb-12 mt-2" onClick={setOnClick}>
        <Image src={arrow} alt="왼쪽을 가르키는 화살표 이미지" width={24} height={24} />
      </Button>
    </div>
  )
}
