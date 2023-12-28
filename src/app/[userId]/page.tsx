import { getTteokguk, getTteokguks } from '@/services/main'
import Image from 'next/image'
import DdayIcon from '../../../public/images/DdayIcon.png'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

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
  const garnishLocation = [
    [5, 20],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]
  return (
    <main className="flex h-full justify-center">
      <div className={`w-96 bg-[url(/images/${떡국?.테이블매트정보}.png)] bg-cover bg-center`}>
        <h1 className="font-xl pb-9 pl-5 pt-8 font-semibold leading-8">{`${떡국.nickname}님의 떡국`}</h1>
        <div className="flex flex-col items-center">
          <div className="font-sm flex-center mb-3 flex flex-row gap-1.5 rounded-2xl bg-gray-200 px-3">
            <Image width={12} height={11} src={DdayIcon} alt="D-day icon" className="py-2" />
            <p>{`까치까치 설날 D-${떡국.디데이}`}</p>
          </div>
          <p className="mb-5">{`${떡국?.편지총개수}개의 덕담을 받았어요!`}</p>
          <div className="relative h-80 w-80 rounded-full bg-gray-200 ">
            {떡국?.고명정보.map((item, idx) => (
              <div
                key={item.고명식별자}
                className={`absolute top-${garnishLocation[idx][0]} left-${garnishLocation[idx][1]} flex flex-col `}
              >
                <div className="h-14 w-14 rounded-full bg-red-200">{item.고명키값}</div>
                <p>{item.닉네임}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const tteokguks = await getTteokguks()
  return tteokguks.map((tteokguk) => ({
    userId: tteokguk.id,
  }))
}
