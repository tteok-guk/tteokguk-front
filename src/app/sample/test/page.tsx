'use client'

import { Button } from '@/components/ui/button'

export default function AuthPage() {
  const btnCStClass = 'p-20 text-white font-40'

  const move3500 = () => (window.location.href = '/sample/test/3500ms')
  const move4000 = () => (window.location.href = '/sample/test/4000ms')
  const move4500 = () => (window.location.href = '/sample/test/4500ms')

  return (
    <section className="flex-center h-full flex-col gap-30 text-20">
      <h1 className="text-center font-soyo">
        온보딩 페이지
        <br />
        이동 시간 테스트
      </h1>
      <Button className={`${btnCStClass} bg-pr-300`} onClick={move3500}>
        3500ms
      </Button>
      <Button className={`${btnCStClass} bg-pr-500`} onClick={move4000}>
        4000ms
      </Button>
      <Button className={`${btnCStClass} bg-pr-700`} onClick={move4500}>
        4500ms
      </Button>
    </section>
  )
}
