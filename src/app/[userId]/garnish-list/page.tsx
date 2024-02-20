'use client'
import { useState } from 'react'
import { getGarnishList } from '@/services/garnish'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { iconArrow } from '../../../../public/images/icons'
import { dragonHeart } from '../../../../public/images/avatar/arm'
import { sorryNoGarnishDragon } from '../../../../public/images/etc'
import { garnishes as grnisheImgs } from '../../../../data/garnishes'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/useToast'
import LoadingPage from '@/app/loading'

export default function GarnishListpage() {
  const { toast } = useToast()
  const router = useRouter()

  // 고명 목록 오픈일
  const [isDDay, setIsDDay] = useState(true)

  // 가니시 상세 조회 핸들러
  const getGarnishDetailsHandler = (
    isOpen: boolean,
    garnishId: string,
    tteokGukId: string,
    isPublic: boolean,
  ) => {
    if (isOpen) {
      router.push(`/${tteokGukId}/${garnishId}`)
    } else if (!isOpen) {
      toast({
        duration: 1850,
        description: '고명 확인은 2월 9일까지 기다려 주세요!',
      })
    }
  }

  // 가니쉬 목록 조회
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['garnishAllList'],
    queryFn: getGarnishList,
  })

  if (isError) {
    toast({
      duration: 1850,
      description: '로그인이 풀리셨나요?',
    })
    router.push(`/error`)
  }

  if (data) {
    if (data?.code === 2002) {
      return (
        <div className={'bg-cover'}>
          <div className={'mt-[-12px] flex'}>
            <div
              className={'cursor-pointer py-12 pl-0 pr-24'}
              onClick={() => router.push('/account')}
            >
              <Image src={iconArrow} alt="왼쪽을 가르키는 화살표 이미지" width={24} height={24} />
            </div>
          </div>
          <div className={'mb-78 flex flex-col items-center gap-12'}>
            <h1 className={'text-28 font-bold leading-[32.4px] text-pr-500'}>
              아직 떡국을 만들지 않았어요!
            </h1>
            <h2 className={'text-12 font-normal leading-[15.6px] text-gr-400'}>
              떡국을 만들면 고명에 덕담을 받을 수 있어요!
            </h2>
          </div>
          <div className="flex h-[calc(100vh-206px)] flex-col gap-y-70">
            <div className={'flex justify-center'}>
              <Image
                src={sorryNoGarnishDragon}
                alt={`덕담이 없어서 아쉬운 청룡이`}
                width={273}
                height={240}
                loading="eager"
                style={{ paddingLeft: '68px' }}
              />
            </div>
            <div className={'flex justify-center'}>
              <button
                className={'h-46 w-164 rounded-full bg-pr-500 text-white'}
                onClick={() => router.push('/host?page=1')}
              >
                떡국 만들러 가기
              </button>
            </div>
          </div>
        </div>
      )
    } else if (data?.data?.garnishes?.length === 0) {
      return (
        <div className={'bg-cover'}>
          <div className={'mt-[-12px] flex'}>
            <div
              className={'cursor-pointer py-12 pl-0 pr-24'}
              onClick={() => router.push('/account')}
            >
              <Image src={iconArrow} alt="왼쪽을 가르키는 화살표 이미지" width={24} height={24} />
            </div>
          </div>
          <div className={'mb-78 flex flex-col items-center gap-12'}>
            <h1 className={'text-28 font-bold leading-[32.4px] text-pr-500'}>
              아직 받은 덕담이 없어요!
            </h1>
            <h2 className={'text-12 font-normal leading-[15.6px] text-gr-400'}>
              내 떡국을 공유하고 덕담을 받아보세요
            </h2>
          </div>
          <div className="flex h-[calc(100vh-206px)] flex-col gap-y-70">
            <div className={'flex justify-center'}>
              <Image
                src={sorryNoGarnishDragon}
                alt={`덕담이 없어서 아쉬운 청룡이`}
                width={273}
                height={240}
                loading="eager"
                style={{ paddingLeft: '68px' }}
              />
            </div>
            <div className={'flex justify-center'}>
              <button
                className={'h-46 w-164 rounded-full bg-pr-500 text-white'}
                onClick={() => router.push('/host?page=1')}
              >
                내 떡국으로 가기
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={'bg-cover'}>
          <div className={'mt-[-12px] flex'}>
            <div
              className={'cursor-pointer py-12 pl-0 pr-24'}
              onClick={() => router.push('/account')}
            >
              <Image src={iconArrow} alt="왼쪽을 가르키는 화살표 이미지" width={24} height={24} />
            </div>
            <div className={'absolute right-20 top-24'}>
              <Image src={dragonHeart} alt={`마음전달하는 용 일러스트`} width={81} height={73} />
            </div>
          </div>
          <div className={'mb-20 flex flex-col gap-4'}>
            <h1 className={'font-xl text-gr-900'}>
              <span className={'text-pr-500'}>
                {data?.data?.garnishes ? data.data.garnishes.length : '0'}개의 덕담
              </span>
              을 받았어요!
            </h1>
          </div>
          <div className={'layout-scroll flex h-[calc(100vh-120px)] flex-col gap-16'}>
            {data?.data?.garnishes?.map((garnish, idx) => {
              return (
                <div
                  key={garnish.nickname + idx}
                  className={'flex w-full flex-shrink-0 cursor-pointer gap-x-12 truncate'}
                  onClick={() =>
                    getGarnishDetailsHandler(
                      isDDay,
                      String(garnish.garnishId),
                      garnish.tteokGukId,
                      garnish.public,
                    )
                  }
                >
                  <div
                    className={
                      'flex h-54 w-54 flex-shrink-0 flex-grow-0 items-center justify-center rounded-full bg-white p-7'
                    }
                  >
                    <Image
                      src={
                        grnisheImgs.find((garnishImg) => garnishImg.id === garnish.garnishType)
                          ?.src || grnisheImgs[6].src
                      }
                      alt={'고명이미지'}
                      width={40}
                      height={40}
                    ></Image>
                  </div>
                  <div className={'flex w-[100%-61px] flex-grow flex-col justify-center truncate'}>
                    <p className={'text-16 font-medium text-gr-900'}>{garnish.nickname}</p>
                    <p className={'truncate text-14 font-medium text-gr-400'}>
                      {garnish.content
                        ? garnish.content.replace(/<br\s*\/?>/gi, ' ')
                        : '2월9일 이후에 확인 할 수 있어요'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }

  return <LoadingPage />
}
