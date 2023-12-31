import { mattObj } from '@/components/DynamicObject/mattObj'
import Garnish from '@/components/Garnish'
import MattEdit from '@/components/MattEdit'
import ShareButton from '@/components/ShareButton'
import { PaginationEntire } from '@/components/common'
import { getTteokguk, getTteokguks } from '@/services/main'
import Image from 'next/image'
import Link from 'next/link'
import { iconDday, iconMypage } from '../../../public/images/icons'

type Props = {
  params: {
    userId: string
  }
}

export default async function DishPage({ params: { userId } }: Props) {
  const 떡국 = await getTteokguk(userId)
  if (!떡국) {
    // 추후 not-found 페이지로 수정 예정
    console.log('해당떡국없음')
  }

  return (
    <section
      className={` mx-[-20px] mt-[-32px] flex h-dvh justify-center ${
        mattObj[떡국?.mattId || 'default']
      } bg-cover bg-center px-20 `}
    >
      {/* <div className={`w-375 bg-[url('/images/${떡국?.테이블매트정보}')] bg-cover bg-center `}> */}
      <div className={` w-375  `}>
        <div className="flex flex-row items-center justify-between pb-36 pt-32 ">
          <h1 className="font-xl">{`${떡국?.nickname}님의 떡국`}</h1>
          <Link href={'/account'}>
            <Image
              src={iconMypage}
              width={28}
              height={28}
              alt="myPageButton"
              className="pb-1 pt-2"
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-sm flex-center mb-8 flex flex-row gap-1.5 rounded-2xl bg-pr-100 px-15 py-3">
            <Image width={12} height={11} src={iconDday} alt="D-day icon" />
            <p className="font-base text-pr-800">{`까치까치 설날 D-${떡국?.dDay}`}</p>
          </div>
          <p className="mb-5">{`${떡국?.garnishCnt}개의 덕담을 받았어요!`}</p>
          <div className="relative mb-31 mt-19 h-300 w-300 rounded-full bg-gr-200">
            <Garnish garnishInfo={떡국?.garnish} />
            {userId === 'host' ? (
              <div className="absolute bottom-[-52px] right-[-18px]">
                <Link href={'/change-matt	'}>
                  <MattEdit mattId={떡국?.mattId || 'default'} />
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>

          <PaginationEntire />
          <ShareButton />
        </div>
      </div>
    </section>
  )
}

export async function generateStaticParams() {
  const tteokguks = await getTteokguks()
  return tteokguks.map((tteokguk) => ({
    userId: tteokguk.id,
  }))
}
