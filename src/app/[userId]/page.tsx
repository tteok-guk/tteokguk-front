import Garnish from '@/components/Garnish'
import MattEdit from '@/components/MattEdit'
import ShareButton from '@/components/ShareButton'
import { PaginationEntire } from '@/components/common'
import { getGarnishes, getGuestTteokguk, getHostTteokguk } from '@/services/main'
import { GarnishItem } from '@/types/MainPageTypes'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { iconDday, iconMypage } from '../../../public/images/icons'
import { dishesObj, mattObj } from './_object/object'

interface Props {
  params: {
    userId: string
  }
  searchParams: {
    page: string
  }
}

export default async function DishPage({ params: { userId }, searchParams: { page } }: Props) {
  let hostTG, garnishes, guestTG
  if (userId === 'host') {
    const hostTGApi = await getHostTteokguk()
    hostTG = hostTGApi.data
    const tgId = hostTG?.tteokGukId
    garnishes = await getGarnishes(tgId, Number(page))
  } else {
    const guestTGApi = await getGuestTteokguk(userId)
    guestTG = guestTGApi?.data
    if (guestTGApi.code === 2001) {
      redirect('/host?page=2')
    }
    if (guestTG === null) {
      redirect('/')
    }
    garnishes = await getGarnishes(userId, 1)
  }

  const nickname = hostTG ? hostTG.nickname : guestTG?.nickname
  const tteokGukId = hostTG ? hostTG.tteokGukId : guestTG?.tteokGukId
  const mattType = hostTG ? hostTG.mattType : guestTG?.mattType
  const dDay = hostTG ? hostTG.dday : guestTG?.dday
  const garnish = garnishes

  const determineDishType = (garnish: GarnishItem[] | undefined, userId: string) => {
    if ((garnish?.length === 0 || !garnish) && userId !== 'host') {
      return 'firstDish'
    } else if (garnish?.length === 0 && userId === 'host') {
      return 'emptyDish'
    } else {
      return 'basicDish'
    }
  }
  return (
    <section
      className={` mx-[-20px] mt-[-32px] flex h-dvh justify-center ${
        mattObj[mattType || 'default']
      } bg-cover bg-center px-20 `}
    >
      <div className={` w-full `}>
        <div className="flex flex-row items-center justify-between pb-36 pt-32 ">
          <h1 className="font-xl">{`${nickname}님의 떡국`}</h1>
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
            <p className="font-base text-pr-800">{`까치까치 설날 D${dDay}`}</p>
          </div>
          <p className="mb-5">{`${garnish?.garnishCnt}개의 덕담을 받았어요!`}</p>
          <div
            className={`relative mb-31 mt-19 h-300 w-300 rounded-full ${
              dishesObj[determineDishType(garnish?.garnishes, userId)]
            } bg-cente bg-cover`}
          >
            <Garnish garnishInfo={garnish?.garnishes} />
            {userId === 'host' ? (
              <div className="absolute bottom-[-52px] right-[-18px]">
                <Link href={'/change-matt	'}>
                  <MattEdit mattType={mattType || 'default'} />
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>

          <PaginationEntire
            pageSize={garnish?.pageSize}
            pageParam={userId}
            currentNum={Number(page)}
          />
          <ShareButton tteokGukId={tteokGukId} />
        </div>
      </div>
    </section>
  )
}
