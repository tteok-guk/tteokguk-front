'use client'
import { Suspense } from 'react'
import { getGarnishList } from '@/services/garnish'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { iconArrow } from '../../../../public/images/icons'
import { dragonHeart } from '../../../../public/images/avatar/arm'
import { sorryNoGarnishDragon } from '../../../../public/images/etc'
import { garnishes as grnisheImgs } from '../../../../data/garnishes'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { notFound } from 'next/navigation'
import LoadingPage from '@/app/loading'

export default function GarnishListpage() {
  const { toast } = useToast()
  const router = useRouter()

  // 가니시 상세 조회 핸들러
  const getGarnishDetailsHandler = (isDday: boolean, garnishId: string, tteokGukId: string) => {
    if (isDday) {
      router.push(`/${tteokGukId}/${garnishId}`)
    } else {
      toast({
        duration: 1850,
        description: '덕담 확인은 2월 9일까지 기다려 주세요!'
      })
    }
  }

  // 가니쉬 목록 조회
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['garnishAllList'],
    queryFn: getGarnishList,
  })

  if (isError) {
    notFound()
  }

  if (data) {
    console.log('data :', data)
    if (data?.data?.garnishes?.length === 0) {
      return (
        <div className={'bg-cover'}>
          <div className={'flex mt-[-12px]'}>
            <div className={'pl-0 pr-24 py-12 cursor-pointer'} onClick={() => (router.push('/account'))}>
              <Image src={iconArrow} alt="왼쪽을 가르키는 화살표 이미지" width={24} height={24} />
            </div>
          </div>
          <div className={'flex flex-col gap-12 mb-78 items-center'}>
            <h1 className={'text-28 leading-[32.4px] font-bold text-pr-500'}>아직 받은 덕담이 없어요!</h1>
            <h2 className={'text-12 leading-[15.6px] font-normal text-gr-400'}>내 떡국을 공유하고 덕담을 받아보세요</h2>
          </div>
          <div className='flex flex-col h-[calc(100vh-206px)] gap-y-70'>
            <div className={'flex justify-center'}>
              <Image src={sorryNoGarnishDragon} alt={`덕담이 없어서 아쉬운 청룡이`} width={273} height={240} loading='eager' style={{ paddingLeft: "68px" }} />
            </div>
            <div className={'flex justify-center'}>
              <button className={'w-164 h-46 bg-pr-500 text-white rounded-full'} onClick={() => (router.push('/host?page=1'))}>내 떡국으로 가기</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={'bg-cover'}>
          <div className={'flex mt-[-12px]'}>
            <div className={'pl-0 pr-24 py-12 cursor-pointer'} onClick={() => (router.push('/account'))}>
              <Image src={iconArrow} alt="왼쪽을 가르키는 화살표 이미지" width={24} height={24} />
            </div>
            <div className={'absolute right-20 top-24'}>
              <Image src={dragonHeart} alt={`마음전달하는 용 일러스트`} width={81} height={73} />
            </div>
          </div>
          <div className={'flex flex-col gap-4 mb-20'}>
            <h1 className={'font-xl text-gr-900'}><span className={'text-pr-500'}>{data?.data?.garnishes ? data.data.garnishes.length : '0'}개의 덕담</span>을 받았어요!</h1>
          </div>
          <div className={'flex flex-col gap-16 h-[calc(100vh-120px)] overflow-y-scroll'}>
            {
              data?.data?.garnishes?.map((garnish, idx) => {
                return (
                  <div key={garnish.nickname + idx} className={'w-full flex gap-x-12 truncate cursor-pointer flex-shrink-0'} onClick={() => (getGarnishDetailsHandler(garnish.content === '2월9일 이후에 확인 할 수 있어요' ? false : true, String(garnish.garnishId), garnish.tteokGukId))}>
                    <div className={'w-54 h-54 p-7 bg-white rounded-full flex justify-center items-center flex-shrink-0 flex-grow-0'}>
                      <Image src={grnisheImgs.find((garnishImg) => garnishImg.id === garnish.garnishType)?.src || grnisheImgs[6].src} alt={'고명이미지'} width={40} height={40} ></Image>
                    </div>
                    <div className={'flex flex-col w-[100%-61px] justify-center truncate flex-grow'}>
                      <p className={'text-16 font-medium text-gr-900'}>{garnish.nickname}</p>
                      <p className={'text-14 font-medium text-gr-400 truncate'}>{garnish.content ? garnish.content : '2월9일 이후에 확인 할 수 있어요'}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }
  return (
    <LoadingPage />
  )
}
