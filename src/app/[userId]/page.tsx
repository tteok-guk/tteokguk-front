import { getTteokguk, getTteokguks } from '@/services/main'
import Image from 'next/image'

type Props = {
  params: {
    userId: string
  }
}

export default async function DishPage({ params: { userId } }: Props) {
  const 떡국 = await getTteokguk(userId)
  if (!떡국) {
    console.log('해당떡국없음')
  }
  console.log(떡국.테이블매트정보)
  return <div>메인페이지</div>
}

export async function generateStaticParams() {
  const tteokguks = await getTteokguks()
  return tteokguks.map((tteokguk) => ({
    userId: tteokguk.id,
  }))
}
