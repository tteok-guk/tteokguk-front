import Garnish from '@/components/Garnish'
import MattEdit from '@/components/MattEdit'
import ShareButton from '@/components/ShareButton'
import { PaginationEntire } from '@/components/common'
import { getGarnishes, getGuestTteokguk, getHostTteokguk } from '@/services/main'
import { GarnishItem } from '@/types/MainPageTypes'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { iconDday, iconMypage } from '../../../public/images/icons'
import { dishesObj, mattObj } from './_object/object'
import NotFoundPage from '../not-found'
import { makeDishBubble, shareBubble } from '../../../public/images/etc/index'
import { cat, dragon, hedgehog } from '../../../public/images/avatar/normal'
import EasterEgg from '@/components/EasterEgg'

export interface Props {
  params: {
    userId: string
  }
  searchParams: {
    page?: string
    garnish?: string
  }
}

export default async function DishPage({ params: { userId }, searchParams: { page } }: Props) {
  let hostTG, garnishes, guestTG
  if (userId === 'host') {
    const hostTGApi = await getHostTteokguk()
    hostTG = hostTGApi?.data

    if (hostTG.tteokGukId) {
      const tgId = hostTG?.tteokGukId
      garnishes = await getGarnishes(tgId, Number(page))
    }
  } else {
    const guestTGApi = await getGuestTteokguk(userId)
    guestTG = guestTGApi?.data
    if (guestTGApi.code === 2001) {
      redirect('/host?page=1')
    }
    if (guestTG === null || guestTGApi.code === 500) {
      notFound()
    }
    garnishes = await getGarnishes(userId, Number(page))
  }

  const nickname = hostTG ? hostTG.nickname : guestTG?.nickname
  const tteokGukId = hostTG ? hostTG.tteokGukId : guestTG?.tteokGukId
  const mattType = hostTG ? hostTG.mattType : guestTG?.mattType
  const garnish = garnishes
  // const dDay = hostTG ? hostTG.dday : guestTG?.dday
  // const dDay = hostTG ? hostTG.dday : guestTG?.dday || -1
  const dDay = hostTG ? hostTG.dday : guestTG?.dday ?? -1

  const dDayUi = dDay === 0 ? 'D-Day' : dDay && dDay >= 1 ? `D+${dDay}` : `D${dDay}`
  const hostAvatar = hostTG ? hostTG.hostAvatar : guestTG?.hostAvatar

  const determineDishType = (garnish: GarnishItem[] | undefined, userId: string) => {
    if (!tteokGukId) {
      return 'makeDish'
    }
    if ((garnish?.length === 0 || !garnish) && userId !== 'host') {
      return 'firstDish'
    } else if ((garnish?.length === 0 || !garnish) && userId === 'host') {
      return 'emptyDish'
    } else {
      return 'basicDish'
    }
  }

  return (
    <div className="relative">
      <EasterEgg />
      <section
        className={` mx-[-20px] mt-[-32px] flex h-dvh justify-center ${
          tteokGukId ? mattObj[mattType || 'default'] : mattObj['blueDew']
        } bg-cover bg-center px-20 `}
      >
        <div className={` w-full `}>
          <div className="flex flex-row items-center justify-between pb-36 pt-32 ">
            <h1 className="font-xl font-soyo">{`${nickname}님의 떡국`}</h1>
            {hostTG && (
              <Link href={'/account'}>
                <Image
                  src={iconMypage}
                  width={28}
                  height={28}
                  alt="myPageButton"
                  className="pb-1 pt-2"
                />
              </Link>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="font-sm flex-center mb-8 flex flex-row gap-1.5 rounded-2xl bg-pr-100 px-15 py-3 lg:px-20 lg:py-6">
              <Image width={12} height={11} src={iconDday} alt="D-day icon" />
              <p className="font-base lg:font-lg text-pr-800">{`까치까치 설날 ${dDayUi}`}</p>
            </div>

            {hostTG?.tteokGukId || guestTG ? (
              <p className="lg:font-lg font-base mb-5">{`${
                garnish?.garnishCnt ? garnish.garnishCnt : 0
              }개의 덕담을 받았어요!`}</p>
            ) : (
              <></>
            )}
            <div className=" relative">
              <div className=" absolute left-[-20px] top-[-3px] block  h-120 w-110 -rotate-45 scale-x-[-1] lg:left-[-50px] lg:top-[-13px] lg:h-250 lg:w-200">
                <Image
                  src={`/images/avatar/normal/${hostAvatar}.png`}
                  width={170}
                  height={200}
                  alt="my avatar"
                />
              </div>
              <div
                className={`relative mt-26 h-300 w-300 lg:h-400 lg:w-400  ${
                  dishesObj[determineDishType(garnish?.garnishes, userId)]
                } bg-cover bg-center`}
              >
                {garnishes && (
                  <Garnish
                    garnishInfo={garnish?.garnishes}
                    Public={guestTG?.public}
                    dDay={guestTG ? guestTG.dday : hostTG?.dday}
                    userId={userId}
                  />
                )}
                {userId === 'host' && tteokGukId ? (
                  <div className="absolute bottom-[-52px] right-[-18px] ">
                    <Link href={`/change-matt?matt=${hostTG?.mattType}`}>
                      <MattEdit mattType={mattType || 'default'} />
                    </Link>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            {tteokGukId && (
              <PaginationEntire
                pageSize={garnish?.pageSize ? garnish.pageSize : 1}
                pageParam={userId}
              />
            )}

            <ShareButton
              tteokGukId={tteokGukId}
              nickname={guestTG?.nickname}
              btnType={dDay >= 0 ? 'openTwice' : 'none'}
            />
          </div>
        </div>
      </section>
      {guestTG && !guestTG.hasTteokGuk && (
        <Image
          src={makeDishBubble}
          alt="makeDishBubble"
          width={159}
          height={36}
          className=" absolute bottom-[97px]"
        />
      )}
      {hostTG && dDay >= 0 && (
        <Image
          src={shareBubble}
          alt="shareBubble"
          width={190}
          height={36}
          className=" absolute bottom-[97px] w-1/2 min-w-190"
        />
      )}
    </div>
  )
}
