'use client'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'

const Garnish = ({ garnishInfo }: GarnishType) => {
  const garnishLocation: GarnishLocationType = {
    0: 'top-[123px] left-[122px]',
    1: 'top-[81px] left-[51px]',
    2: 'top-[39px] left-[122px]',
    3: 'top-[81px] left-[194px]',
    4: 'top-[164px] left-[51px]',
    5: 'top-[205px] left-[122px]',
    6: 'top-[164px] left-[194px]',
  }
  const GarnishDetailMoveToBtnHandler = () => {
    toast({ description: '편지 확인은 02/09까지 기다려 주세요.' })
  }
  return (
    <>
      {garnishInfo?.map((item: GarnishArrType, idx: number) => (
        <div
          key={item.garnishId}
          className={` absolute text-center ${garnishLocation[idx]} flex flex-col `}
          onClick={GarnishDetailMoveToBtnHandler}
        >
          <div className={`h-54 w-54 `}>
            <Image
              width={54}
              height={54}
              src={`/images/garnishes/${item.garnishName}.png`}
              alt="garnish"
            />
          </div>
          <p className="font-xs">{item.nickname}</p>
        </div>
      ))}
    </>
  )
}

export default Garnish

export interface GarnishArrType {
  garnishId: number
  nickname: string
  garnishName: string
}

export interface GarnishType {
  garnishInfo?: GarnishArrType[]
}

export interface GarnishLocationType {
  [key: number]: string
}
